#import('dart:html');
#import('utils/webglUtils.dart');
// http://www.cake23.de/traveling-wavefronts-lit-up.html
// Felix Woitzel is the original javascript author of this code. He is awesome, thanks for the code!
// 
class DartWebGLShaderLab {
  Stopwatch watch;
  var gl;
  var c;
  var prog_advance;
  var prog_composite;
  var prog_blur_horizontal;
  var prog_blur_vertical;
  var FBO_main;
  var FBO_main2;
  var FBO_helper;
  var FBO_blur;
  var FBO_noise;
  var texture_main_l; // main, linear
  var texture_main_n; // main, nearest (accurate pixel access on the same buffer)
  var texture_main2_l; // main double buffer, linear
  var texture_main2_n; // main double buffer, nearest (accurate pixel access on the same buffer)
  var texture_helper; // to be used when a buffer for multi-pass shader programs is needed (2-pass Gaussian blur)
  var texture_blur; // blur result
  var texture_noise_n; // noise pixel accurate
  var texture_noise_l; // noise interpolated pixel access

  var halted = false;
  var delay = 3;
  var it = 1;
  var frames = 0;
  var fps = 60; // no hurdle for DX10 graphics cards
  var time;
  var mouseX = 0.5;
  var mouseY = 0.5;
  var animation;
  var timer;
  // texture size (must be powers of two, remember 2048x1024 flat could also be a 128x128x128 voxel)
//  var sizeX = 1024;
//  var sizeY = 1024; // 2048x1024 flat or 128x128x128 cube
//  // viewport size
//  var viewX = 1024;
//  var viewY = 1024;
  
  var sizeX = 128;
  var sizeY = 128; // 2048x1024 flat or 128x128x128 cube
  // viewport size
  var viewX = 128;
  var viewY = 128;
  

  
  
  DartWebGLShaderLab() {
  }

  getShader(g, id) {
    return createShaderFromScriptElement(g, id);
  }
  
  void run() {
    c = document.query("#c");
    gl = getWebGLContext(c);
    
    if (c is! CanvasElement || gl is! WebGLRenderingContext) {
      print("failed to load canvas");
      return;
    }
    
    document.on.mouseMove.add((MouseEvent event) {
      mouseX = event.pageX / viewX;
      mouseY = 1 - event.pageY / viewY;
    });
    
    document.on.click.add((_) {
      halted = !halted;
    });
    
    c.width = viewX;
    c.height = viewY;
    
    prog_advance = gl.createProgram();
    gl.attachShader(prog_advance, getShader(gl, "#shader-vs"));
    gl.attachShader(prog_advance, getShader(gl, "#shader-fs-advance"));
    gl.linkProgram(prog_advance);
    
    prog_composite = gl.createProgram();
    gl.attachShader(prog_composite, getShader(gl, "#shader-vs"));
    gl.attachShader(prog_composite, getShader(gl, "#shader-fs-composite"));
    gl.linkProgram(prog_composite);

    prog_blur_horizontal = gl.createProgram();
    gl.attachShader(prog_blur_horizontal, getShader(gl, "#shader-vs"));
    gl.attachShader(prog_blur_horizontal, getShader(gl, "#shader-fs-blur-horizontal"));
    gl.linkProgram(prog_blur_horizontal);

    prog_blur_vertical = gl.createProgram();
    gl.attachShader(prog_blur_vertical, getShader(gl, "#shader-vs"));
    gl.attachShader(prog_blur_vertical, getShader(gl, "#shader-fs-blur-vertical"));
    gl.linkProgram(prog_blur_vertical);
    
    var posBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, posBuffer);

    Float32Array vertices = new Float32Array.fromList([ -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0 ]);

    var aPosLoc = gl.getAttribLocation(prog_advance, "aPos");
    gl.enableVertexAttribArray(aPosLoc);

    var aTexLoc = gl.getAttribLocation(prog_advance, "aTexCoord");
    gl.enableVertexAttribArray(aTexLoc);

    Float32Array texCoords = new Float32Array.fromList([ 0, 0, 1, 0, 0, 1, 1, 1 ]);

    var texCoordOffset = vertices.byteLength;
    
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, texCoordOffset + texCoords.byteLength, WebGLRenderingContext.STATIC_DRAW);
    gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, vertices);
    gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, texCoordOffset, texCoords);
    gl.vertexAttribPointer(aPosLoc, 3, WebGLRenderingContext.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(aTexLoc, 2, WebGLRenderingContext.FLOAT, false, 0, texCoordOffset);
    
    
//    var noisepixels = [];
//    var pixels = [];
//    for ( var i = 0; i < sizeX; i++) {
//      for ( var j = 0; j < sizeY; j++) {
//        noisepixels.add(Math.random() * 255);
//        noisepixels.add(Math.random() * 255);
//        noisepixels.add(Math.random() * 255);
//        noisepixels.add(255);
//        
//        pixels.add(0);
//        pixels.add(0);
//        pixels.add(0);
//        pixels.add(255);
//      }
//    }
    
        final int requiredSize = sizeX * sizeY * 4;
        var noisepixels = new Uint8Array(requiredSize);
        var pixels = new Uint8Array(requiredSize);
        for (int i = 0; i < requiredSize; i += 4) {
          noisepixels[i] = (Math.random() * 255).toInt();
          noisepixels[i + 1] = (Math.random() * 255).toInt();
          noisepixels[i + 2] = (Math.random() * 255).toInt();
          noisepixels[i + 3] = 255;
    
          pixels[i] = 0;
          pixels[i + 1] = 0;
          pixels[i + 2] = 0;
          pixels[i + 3] = 255;
        }
    /*
     * if (Math.random() > density) pixels.push(0, 0, 0, 0); else pixels.push(255, 0, 0, 0);
     */

    var rawData = new Uint8Array.fromList(noisepixels);
    texture_main_l = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_l);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
    
    texture_main_n = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_n);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);

    rawData = new Uint8Array.fromList(noisepixels);
    rawData = new Uint8Array.fromList(noisepixels);
    texture_main2_l = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_l);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);

    texture_main2_n = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_n);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);

    rawData = new Uint8Array.fromList(pixels);
    texture_helper = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_helper);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);

    rawData = new Uint8Array.fromList(pixels);
    texture_blur = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_blur);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);

    rawData = new Uint8Array.fromList(noisepixels);
    texture_noise_l = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_noise_l);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);

    texture_noise_n = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_noise_n);
    gl.pixelStorei(WebGLRenderingContext.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, sizeX, sizeY, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, rawData);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);

    // gl.uniform1i(gl.getUniformLocation(prog, "uTexSamp"), 0);
    FBO_main = gl.createFramebuffer();
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_main);
    gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, texture_main_l, 0);

    FBO_main2 = gl.createFramebuffer();
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_main2);
    gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, texture_main2_l, 0);

    FBO_helper = gl.createFramebuffer();
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_helper);
    gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, texture_helper, 0);

    FBO_blur = gl.createFramebuffer();
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_blur);
    gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, texture_blur, 0);

    FBO_noise = gl.createFramebuffer();
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_noise);
    gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, texture_noise_l, 0);

    gl.useProgram(prog_advance);
    setUniforms(prog_advance);

    gl.useProgram(prog_blur_horizontal);
    gl.uniform2f(gl.getUniformLocation(prog_blur_horizontal, "pixelSize"), 1.0 / sizeX, 1.0 / sizeY);
    gl.uniform1i(gl.getUniformLocation(prog_blur_horizontal, "src_tex"), 0);

    gl.useProgram(prog_blur_vertical);
    gl.uniform2f(gl.getUniformLocation(prog_blur_vertical, "pixelSize"), 1.0 / sizeX, 1.0 / sizeY);
    gl.uniform1i(gl.getUniformLocation(prog_blur_vertical, "src_tex"), 0);

    gl.useProgram(prog_composite);
    setUniforms(prog_composite);

    gl.activeTexture(WebGLRenderingContext.TEXTURE2);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_blur);

    gl.activeTexture(WebGLRenderingContext.TEXTURE3);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_noise_l);

    gl.activeTexture(WebGLRenderingContext.TEXTURE4);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_noise_n);

    calculateBlurTexture();
    
    watch = new Stopwatch();
    watch.start();
    anim(0);
  }
  
  setUniforms(program) {
    gl.uniform2f(gl.getUniformLocation(program, "pixelSize"), 1.0 / sizeX, 1.0 / sizeY);
    gl.uniform4f(gl.getUniformLocation(program, "rnd"), Math.random(), Math.random(), Math.random(), Math.random());
    gl.uniform1f(gl.getUniformLocation(program, "fps"), fps);
    gl.uniform1f(gl.getUniformLocation(program, "time"), time);
    gl.uniform2f(gl.getUniformLocation(program, "aspect"), Math.max(1, viewX / viewY), Math.max(1, viewY / viewX));
    gl.uniform2f(gl.getUniformLocation(program, "mouse"), mouseX, mouseY);
    gl.uniform1i(gl.getUniformLocation(program, "sampler_prev"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "sampler_prev_n"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "sampler_blur"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "sampler_noise"), 3);
    gl.uniform1i(gl.getUniformLocation(program, "sampler_noise_n"), 4);
  }

  calculateBlurTexture() {
    // horizontal
    gl.viewport(0, 0, sizeX, sizeY);
    gl.useProgram(prog_blur_horizontal);
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    if (it < 0) {
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_l);
      gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_helper);
    } else {
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_l);
      gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_helper);
    }
    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, 4);
    gl.flush();

    // vertical
    gl.viewport(0, 0, sizeX, sizeY);
    gl.useProgram(prog_blur_vertical);
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_helper);
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_blur);
    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, 4);
    gl.flush();

    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, 4);
    gl.flush();
  }
  
  advance() {
    gl.viewport(0, 0, sizeX, sizeY);
    gl.useProgram(prog_advance);
    setUniforms(prog_advance);
    if (it > 0) {
      gl.activeTexture(WebGLRenderingContext.TEXTURE0);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_l); // interpolated input
      gl.activeTexture(WebGLRenderingContext.TEXTURE1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_n); // "nearest" input
      gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_main2); // write to buffer
    } else {
      gl.activeTexture(WebGLRenderingContext.TEXTURE0);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_l); // interpolated
      gl.activeTexture(WebGLRenderingContext.TEXTURE1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_n); // "nearest"
      gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, FBO_main); // write to buffer
    }
    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, 4);
    gl.flush();

    calculateBlurTexture();
    it = -it;
  }
  
  composite() {
    gl.viewport(0, 0, viewX, viewY);
    gl.useProgram(prog_composite);
    setUniforms(prog_composite);
    if (it < 0) {
      gl.activeTexture(WebGLRenderingContext.TEXTURE0);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_l);
      gl.activeTexture(WebGLRenderingContext.TEXTURE1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main_n);
    } else {
      gl.activeTexture(WebGLRenderingContext.TEXTURE0);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_l);
      gl.activeTexture(WebGLRenderingContext.TEXTURE1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture_main2_n);
    }
    gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, 4);
    gl.flush();
    frames++;
  }
  
  bool anim(int i) {
    //document.window.webkitRequestAnimationFrame(anim);
    window.requestAnimationFrame(anim);
    if (!halted) { 
      
      advance(); 
    }
    
    composite();
    
    if (watch.elapsedInMs() >= 1000) {
      fps=(1000*(frames.toDouble() / watch.elapsedInMs().toDouble())).round();
      //watch.stop();
      //print("fps=${fps}");
      document.query("#fps").innerHTML = "fps=${fps}";
      frames=0;
      watch.reset();
      //watch.start();
    }
    
  }
  
}

void main() {
  new DartWebGLShaderLab().run();
}
