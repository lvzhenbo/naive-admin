<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <slot></slot>
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup lang="ts"></script>

<style scoped></style>
