
in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float time;
uniform float speed;
uniform float speedY;
uniform float video;
uniform float value1;
uniform float value2;
uniform float value3;
uniform float value4;
uniform float contrast;
uniform float alpha;
uniform vec4 color;

// Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec4 renderScene() {
    vec2 st = texCoord.xy;

    vec2 cellSize = vec2(1.0) / 400.0;

    vec2 cellIndex = floor(st / cellSize);

    
    // Shade the cell based on coin flip and progress
    vec3 cellColor = mix(vec3(0.00, 0.0, 0.0), vec3(1.0, 1.0, 1.0), random(cellIndex*sin(time)));

    return vec4(cellColor, 1.0);
}

void main() {
    fragColor = renderScene();
}