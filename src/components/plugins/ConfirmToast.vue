<template>
  <transition name="fade">
    <div v-if="visible" class="toast-container">
      <div :class="['toast-inner', variant]">
        <div class="toast-message">{{ message }}</div>
        <div class="toast-actions">
          <button class="btn-accept" @click="handleAccept">
            {{ t("confirmToast.btnConfirm") }}
          </button>
          <button class="btn-cancel" @click="handleReject">
            {{ t("confirmToast.btnCancel") }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// 🌐 i18n
const { t } = useI18n();

const visible = ref(false);
const message = ref("");
const variant = ref<"success" | "error" | "warning" | "info" | "default">(
  "default"
);

let onAccept: () => void = () => {};
let onReject: () => void = () => {};

const show = (
  msg: string,
  acceptFn: () => void,
  rejectFn: () => void,
  v: "success" | "error" | "warning" | "info" | "default" = "default"
) => {
  message.value = msg;
  onAccept = acceptFn;
  onReject = rejectFn;
  variant.value = v;
  visible.value = true;
};

const handleAccept = () => {
  visible.value = false;
  onAccept();
};

const handleReject = () => {
  visible.value = false;
  onReject();
};

defineExpose({ show });
</script>

<style scoped lang="scss">
@import "../../scss/vue.scss";
.toast-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: auto;
}

.toast-inner {
  background: #212529;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 320px;
  width: max-content;
  display: inline-block;
}

/* Variantes */
.toast-inner.success {
  background: $success;
}

.toast-inner.error {
  background: $danger;
}

.toast-inner.warning {
  background: $warning;
  color: #212529;
}

.toast-inner.info {
  background: $primary;
}

.toast-message {
  margin-bottom: 8px;
}

.toast-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.toast-actions button {
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-accept {
  background: #198754;
  color: #fff;
}

.btn-accept:hover {
  background: #157347;
}

.btn-cancel {
  background: #6c757d;
  color: #fff;
}

.btn-cancel:hover {
  background: #5c636a;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(
    calc(-100vh)
  ); /* 💡 sale desde fuera de la pantalla arriba */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(calc(-100vh)); /* 💡 se va hacia fuera por arriba */
}
</style>
