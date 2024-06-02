Demo.prototype.init = function () {
  const settings = new Settings();

  settings.demo.sync.rocketFile = 'sync/auto.rocket';
  settings.demo.sync.mandatory = true;
  settings.demo.sync.beatsPerMinute = 120;
  settings.demo.sync.rowsPerBeat = 8;
  settings.demo.image.texture.wrapS = 'RepeatWrapping';
  settings.demo.image.texture.wrapT = 'RepeatWrapping';

  var start = 0;
  var duration = 666;
  var beat = 120 / 60;
  var pattern = beat * 8;

  this.createFBO(0, 999, 'fbo0');
  this.createFBO(9999, 20000, 'postproc1');

  this.demoText(pattern, 4 * beat, 1.0, 0.25, -1.0, 0.25, 'tex_text1.png', 2.0);
  this.demoText(
    pattern + 2 * beat,
    4 * beat,
    -1.0,
    -0.25,
    1.0,
    -0.25,
    'tex_text2.png',
    1.7
  );
  this.demoText(
    pattern + 4 * beat,
    4 * beat,
    1.0,
    0.25,
    -1.0,
    0.25,
    'tex_text3.png',
    1.6
  );
  this.demoText(
    pattern + 6 * beat,
    2 * beat,
    -1.0,
    -0.25,
    1.0,
    -0.25,
    'tex_text4.png',
    1.7
  );

  this.demoText(
    3 * pattern,
    2.5 * beat,
    0.0,
    -0.5,
    0.0,
    0.5,
    'tex_text5.png',
    2.6
  );
  this.demoText(
    3 * pattern + 1.5 * beat,
    2.5 * beat,
    0.0,
    -0.5,
    0.0,
    0.5,
    'tex_text6.png',
    2.2
  );

  this.demoText(
    4 * pattern,
    0.5 * pattern,
    0.0,
    -1,
    0.0,
    0.75,
    'tex_text7.png',
    2.2
  );
  this.demoText(
    5 * pattern,
    1.5 * pattern,
    0.0,
    -0.5,
    0.0,
    1,
    'tex_auto2000.png',
    3.2
  );

  this.loader.addAnimation({
    start: start,
    duration: duration,
    camera: 'cam1',
    //where camera is located
    position: [
      {
        x: () => Sync.get('CamPosX'),
        y: () => Sync.get('CamPosY'),
        z: () => Sync.get('CamPosZ')
      }
    ],
    //where camera is looking at
    lookAt: [
      {
        x: () => Sync.get('CamTarX'),
        y: () => Sync.get('CamTarY'),
        z: () => Sync.get('CamTarZ')
      }
    ],
    //camera's up vector
    up: [{ x: 0, y: 1, z: 0 }],
    //camera's perspective setup
    perspective: [
      { fov: () => Sync.get('FOV'), aspect: 16 / 9, near: 0.05, far: 1000 }
    ]
  });

  this.loader.addAnimation({
    start: start,
    duration: duration,
    layer: 500,
    light: {
      type: 'Directional',
      // animate intensity
      properties: { intensity: () => Sync.get('LightIn') }
    },
    color: [{ r: 1.0, g: 1.0, b: 1.0 }],
    position: [
      {
        x: () => Sync.get('LightPosX'),
        y: () => Sync.get('LightPosY'),
        z: () => Sync.get('LightPosZ')
      }
    ]
  });

  this.loader.addAnimation({
    start: start,
    duration: duration,
    layer: 500,
    light: {
      type: 'Ambient',
      // animate intensity
      properties: { intensity: () => Sync.get('AmbIn') }
    },
    color: [{ r: 1.0, g: 1.0, b: 1.0 }]
  });

  this.loader.addAnimation({
    start: start,
    duration: duration,
    layer: 500,
    light: {
      type: 'Point',
      // animate intensity
      properties: { intensity: () => Sync.get('PointIn') },
      castShadow: true
    },
    color: [{ r: 1.0, g: 1.0, b: 1.0 }],
    position: [
      {
        x: () => Sync.get('PointPosX'),
        y: () => Sync.get('PointPosY'),
        z: () => Sync.get('PointPosZ')
      }
    ]
  });

  this.loader.addAnimation([
    {
      start: start,
      duration: 3 * pattern,
      layer: 500,
      scale: [{ uniform3d: 1.5 }],
      image: ['tex_car.png'],
      object: { name: 'obj_car.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 3 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 2.5 }],
      image: ['tex_car.png'],
      object: { name: 'obj_engine.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 4 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 5.5 }],
      image: ['tex_grid.png'],
      object: { name: 'obj_city_base.obj' },
      position: [
        {
          x: 0,
          y: -2.85,
          z: -15
        }
      ],
      angle: [
        {
          degreesY: () => -15.0 * getSceneTimeFromStart()
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 4 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 5.5 }],
      image: ['tex_grid.png'],
      object: { name: 'obj_city_base.obj' },
      position: [
        {
          x: 0,
          y: 3.15,
          z: -15
        }
      ],
      angle: [
        {
          degreesY: () => -15.0 * getSceneTimeFromStart(),
          degreesZ: 180
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 4 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 1.0 }],
      image: ['tex_car.png'],
      object: { name: 'obj_car_fakewire.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      color: [
        {
          r: 0.75,
          g: 0.2,
          b: 1
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 3 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 2.5 }],
      image: ['tex_car.png'],
      object: { name: 'obj_engine.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);
  this.loader.addAnimation([
    {
      start: start,
      duration: 1 * pattern,
      layer: 500,
      scale: [{ uniform3d: 5.5 }],
      image: ['tex_grid.png'],
      object: { name: 'obj_city_base.obj' },
      position: [
        {
          x: 0,
          y: -2.85,
          z: 0
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: start + pattern,
      duration: 1 * pattern,
      layer: 500,
      scale: [{ uniform3d: 5.5 }],
      image: ['tex_grid.png'],
      object: { name: 'obj_city_base.obj' },
      position: [
        {
          x: 0,
          y: -2.85,
          z: 0
        }
      ],
      angle: [
        {
          degreesY: () => -15.0 * getSceneTimeFromStart()
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: start + pattern * 2,
      duration: 1 * pattern,
      layer: 500,
      scale: [{ uniform3d: 5.5 }],
      image: ['tex_grid.png'],
      object: { name: 'obj_city_base.obj' },
      position: [
        {
          x: 0,
          y: -2.85,
          z: 0
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: start + 2 * pattern,
      duration: pattern,
      layer: 500,
      scale: [{ uniform3d: 11 }],
      image: ['tex_grid2.png'],
      object: { name: 'obj_city_buildings.obj' },
      position: [
        {
          x: 4,
          y: -2.85,
          z: 0
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: start + 2 * pattern,
      duration: pattern,
      layer: 500,
      scale: [{ uniform3d: 11 }],
      image: ['tex_grid2.png'],
      object: { name: 'obj_city_roads.obj' },
      position: [
        {
          x: 4,
          y: -2.85,
          z: 0
        }
      ]
    }
  ]);
  // drive 1 bg's
  this.loader.addAnimation({
    start: start,
    duration: duration,
    layer: 1,
    image: ['white.png'],
    scale: [{ uniform3d: 25.0 }],
    color: [
      {
        r: 0,
        g: 0,
        b: 0
      }
    ]
  });

  this.loader.addAnimation([
    {
      start: 3.5 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 1.0 }],
      image: ['tex_car.png'],
      object: { name: 'obj_car.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 4.5 * pattern,
      duration: 0.5 * pattern,
      layer: 500,
      scale: [{ uniform3d: 1.0 }],
      image: ['tex_car.png'],
      object: { name: 'obj_car.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);

  this.loader.addAnimation([
    {
      start: 3.5 * pattern,
      duration: 0.5 * pattern,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 250,
      shader: {
        name: 'menger_bg.fs',
        variable: [
          { name: 'timeMultiplier', type: 'float', value: [1.0] },
          { name: 'invert', type: 'float', value: [0.0] },
          {
            name: 'rotation',
            type: 'float',
            value: [() => Sync.get('mengerrotate')]
          },
          {
            name: 'rotation2',
            type: 'float',
            value: [() => Sync.get('mengerrotate2')]
          },
          {
            name: 'rotation3',
            type: 'float',
            value: [() => Sync.get('mengerrotate3')]
          },
          {
            name: 'speed',
            type: 'float',
            value: [() => -1.5 * getSceneTimeFromStart()]
          },
          { name: 'MAX_STEPS', type: 'float', value: [25.0] },
          { name: 'mengerdivisor', type: 'float', value: [5.0] }
        ]
      }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 4.5 * pattern,
      duration: 0.5 * pattern,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 250,
      shader: {
        name: 'menger_bg.fs',
        variable: [
          { name: 'timeMultiplier', type: 'float', value: [1.0] },
          { name: 'invert', type: 'float', value: [0.0] },
          {
            name: 'rotation',
            type: 'float',
            value: [() => Sync.get('mengerrotate')]
          },
          {
            name: 'rotation2',
            type: 'float',
            value: [() => Sync.get('mengerrotate2')]
          },
          {
            name: 'rotation3',
            type: 'float',
            value: [() => Sync.get('mengerrotate3')]
          },
          {
            name: 'speed',
            type: 'float',
            value: [() => 1.5 * getSceneTimeFromStart()]
          },
          { name: 'MAX_STEPS', type: 'float', value: [25.0] },
          { name: 'mengerdivisor', type: 'float', value: [5.0] }
        ]
      }
    }
  ]);
  this.loader.addAnimation([
    {
      start: 5 * pattern,
      duration: 3 * pattern,
      layer: 500,
      scale: [{ uniform3d: 1.5 }],
      image: ['tex_car.png'],
      object: { name: 'obj_car.obj' },
      position: [
        {
          x: () => Sync.get('CarPosX'),
          y: () => Sync.get('CarPosY'),
          z: () => Sync.get('CarPosZ')
        }
      ],
      angle: [
        {
          degreesY: () => Sync.get('CarRotY'),
          degreesX: () => Sync.get('CarRotX'),
          degreesZ: () => Sync.get('CarRotZ')
        }
      ]
    }
  ]);
  this.loader.addAnimation([
    {
      start: 3 * pattern,
      duration: 0.5 * pattern,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 250,
      shader: {
        name: 'starfield.fs',
        variable: [{ name: 'timeScale', type: 'float', value: [1.0] }]
      }
    }
  ]);
  this.loader.addAnimation([
    {
      start: 5 * pattern,
      duration: 1.5 * pattern,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 250,
      shader: {
        name: 'starfield.fs',
        variable: [{ name: 'timeScale', type: 'float', value: [-0.5] }]
      }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 5.86 * pattern,
      duration: 2,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 12250,
      shader: {
        name: 'clouds.fs',
        variable: [{ name: 'timeScale', type: 'float', value: [-0.5] }]
      }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 5.86 * pattern,
      duration: 55.5 * pattern,
      image: ['tex_hetkinen.png'],
      scale: [{ x: () => Sync.get('kitt'), y: () => Sync.get('kitt') }],
      layer: 800
    }
  ]);
  // post processing

  this.loader.addAnimation([
    {
      start: 0,
      duration: duration,
      image: ['fbo0.color.fbo'],
      layer: 10000,
      shader: {
        fader: 0.5,
        name: 'hackglow.fs',
        variable: [
          {
            name: 'multiplier',
            type: 'float',
            value: [() => Sync.get('glowmultiplier')]
          }
        ]
      }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 0,
      duration: duration,
      image: ['postproc1.color.fbo'],
      layer: 40000,
      color: [
        {
          r: () => Sync.get('fade'),
          g: () => Sync.get('fade'),
          b: () => Sync.get('fade'),
          a: 1.0
        }
      ]
    }
  ]);

  this.loader.addAnimation({
    start: start,
    duration: duration,
    layer: 50000,
    image: ['tex_scanline.png'],
    scale: [{ uniform3d: 2.0 }],
    color: [
      {
        r: 0,
        g: 0,
        b: 0,
        a: 0.2
      }
    ]
  });

  this.loader.addAnimation([
    {
      start: 0,
      duration: duration,
      image: ['white.png'],
      scale: [{ x: 25.0, y: -25.0 }],
      layer: 12250,
      shader: {
        name: 'noise.fs',
        variable: [{ name: 'timeScale', type: 'float', value: [-0.5] }]
      }
    }
  ]);
};

Demo.prototype.createFBO = function (startLayer, endLayer, name) {
  this.loader.addAnimation([
    {
      start: 0,
      duration: 99999,
      layer: startLayer,
      fbo: { name: name, action: 'begin', storeDepth: true }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 0,
      duration: 99999,
      layer: endLayer,
      fbo: { name: name, action: 'unbind' }
    }
  ]);
};

Demo.prototype.demoText = function (
  start,
  duration,
  posx1,
  posy1,
  posx2,
  posy2,
  image,
  scale
) {
  this.loader.addAnimation([
    {
      start: start,
      duration: duration,
      layer: 501,
      image: [image],
      scale: [{ uniform3d: scale }],
      color: [
        {
          r: 1,
          g: 1,
          b: 1,
          a: 0
        },
        { duration: 0.25, a: 1 },
        { duration: duration - 0.5, a: 1 },
        { duration: 0.25, a: 0 }
      ],
      position: [
        {
          x: posx1,
          y: posy1
        },
        { duration: duration, x: posx2, y: posy2 }
      ]
    }
  ]);
};
