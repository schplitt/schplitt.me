<script setup lang="ts">
import createGlobe from 'cobe';

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');


const GERMANY_COORDINATES = [50.1109, 8.6821] as [number, number];

let globe: ReturnType<typeof createGlobe> | null = null;



const size = shallowRef(0);

const visible = shallowRef(false);

onBeforeUnmount(() => {
    globe?.destroy();
});

onMounted(async () => {
    await nextTick();

    let phi = -2.5;





    globe = createGlobe(canvas.value!, {
        devicePixelRatio: 2,
        width: size.value,
        height: size.value,
        phi: 0,
        theta: 0.3, // Adjust to better show Europe
        dark: 0,
        diffuse: 1.2,
        mapSamples: 24000,
        mapBrightness: 0.8,
        mapBaseBrightness: 0.05,
        baseColor: [0.9, 0.9, 0.9],
        markerColor: [47, 202, 237],
        glowColor: [1, 1, 1],
        markers: [
            { location: GERMANY_COORDINATES, size: 0.06 },
        ],
        scale: 2,
        onRender: (state) => {
            // Update rotation
            state.phi = phi;
            phi += 0.002;
            // Update dimensions on render
            state.width = size.value;
            state.height = size.value;
            globe?.resize();
            state.offset = [-size.value / 2, -size.value / 2];
        },
    });

    // Set up resize observer for more responsive updates
    useResizeObserver(document.body, async () => {
        // when width > height, use height as size
        // when  
        size.value = document.body.offsetHeight
    });




    // Add fade-in effect
    setTimeout(() => {
        console.log('fade in')
        globe?.resize();
        visible.value = true;
    });



})


</script>

<template>
    <Teleport to="body">
        <canvas ref="canvas" class="absolute left-0 top-0 w-full h-full" style="transition: opacity 1s ease;" :style="{

            opacity: visible ? 1 : 0,
        }"></canvas>
    </Teleport>
</template>

<style scoped></style>