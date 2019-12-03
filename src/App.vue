<template>
  <div id="app">
    <h1 class="text-center print:hidden">Neofonie Badge Generator</h1>
    <Overvue />
  </div>
</template>

<script>
import Overvue from './components/Over.vue';

export default {
  name: 'app',
  components: {
    Overvue
  }
};
</script>

<style lang="less">
body {
  font-family: Helvetica, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

@media print {
  .overvue .docsize {
    border: 0 !important;
    height: auto !important;
    margin: 0 !important;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}

:root {
  --base: 16px;
  --base-half: calc(var(--base) / 2);
  --base-quarter: calc(var(--base) / 4);
  --base-double: calc(var(--base) * 2.5);
  --font: var(--base);
  --font-big: calc(var(--font) * 1.5);
  --font-bigger: calc(var(--font) * 3);
  --clr-black: #000;
  --clr-red: #e60023;
  --clr-grey: #ccc;
}

.fas {
  cursor: pointer;

  &:hover {
    color: var(--clr-red) !important;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }
}
</style>
