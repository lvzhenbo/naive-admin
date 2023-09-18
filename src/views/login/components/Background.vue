<template>
  <ul class="background overflow-hidden absolute h-full w-full top-0 left-0 m-0 p-0">
    <li
      v-for="n in 10"
      :key="n"
      class="absolute list-none block h-10 w-10 bg-[rgba(255,255,255,0.2)] animate-[login_25s_linear_infinite] ease-linear bottom-[-10rem]"
      :class="liClass"
    ></li>
  </ul>
</template>

<script setup lang="ts">
  const liClass = [
    '[&:nth-child(1)]:left-[10%]',
    '[&:nth-child(2)]:left-[20%]',
    '[&:nth-child(2)]:w-20',
    '[&:nth-child(2)]:h-20',
    '[&:nth-child(2)]:animation-delay-[2s]',
    '[&:nth-child(2)]:animation-duration-[17s]',
    '[&:nth-child(3)]:left-[25%]',
    '[&:nth-child(3)]:animation-delay-[4s]',
    '[&:nth-child(4)]:left-[40%]',
    '[&:nth-child(4)]:w-[3.75rem]',
    '[&:nth-child(4)]:h-[3.75rem]',
    '[&:nth-child(4)]:animation-duration-[22s]',
    '[&:nth-child(4)]:bg-[rgba(255,255,255,0.25)]',
    '[&:nth-child(5)]:left-[70%]',
    '[&:nth-child(6)]:left-[80%]',
    '[&:nth-child(6)]:w-[7.5rem]',
    '[&:nth-child(6)]:h-[7.5rem]',
    '[&:nth-child(6)]:animation-delay-[3s]',
    '[&:nth-child(6)]:bg-[rgba(255,255,255,0.2)]',
    '[&:nth-child(7)]:left-[32%]',
    '[&:nth-child(7)]:w-40',
    '[&:nth-child(7)]:h-40',
    '[&:nth-child(7)]:animation-delay-[7s]',
    '[&:nth-child(8)]:left-[55%]',
    '[&:nth-child(8)]:w-5',
    '[&:nth-child(8)]:h-5',
    '[&:nth-child(8)]:animation-delay-[15s]',
    '[&:nth-child(8)]:animation-duration-[40s]',
    '[&:nth-child(9)]:left-[25%]',
    '[&:nth-child(9)]:w-2.5',
    '[&:nth-child(9)]:h-2.5',
    '[&:nth-child(9)]:animation-delay-[2s]',
    '[&:nth-child(9)]:animation-duration-[40s]',
    '[&:nth-child(9)]:bg-[rgba(255,255,255,0.3)]',
    '[&:nth-child(10)]:left-[90%]',
    '[&:nth-child(10)]:w-40',
    '[&:nth-child(10)]:h-40',
    '[&:nth-child(10)]:animation-delay-[11s]',
  ];
</script>

<style scoped></style>
