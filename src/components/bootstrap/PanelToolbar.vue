<template>
  <div class="panel-heading-btn d-flex align-items-center gap-2">
    <a
      href="javascript:;"
      class="btn btn-xs btn-icon btn-default"
      ref="expandToggler"
    >
      <i class="fa fa-expand"></i>
    </a>
    <a
      href="javascript:;"
      class="btn btn-xs btn-icon btn-success"
      ref="reloadToggler"
    >
      <i class="fa fa-redo"></i>
    </a>
    <a
      href="javascript:;"
      class="btn btn-xs btn-icon btn-warning"
      ref="collapseToggler"
    >
      <i class="fa fa-minus"></i>
    </a>
    <a
      href="javascript:;"
      class="btn btn-xs btn-icon btn-danger"
      ref="removeToggler"
      :class="{ disabled: !props.canRemove }"
      @click.prevent="emit('remove')"
    >
      <i class="fa fa-times"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Tooltip } from "bootstrap";
import { slideToggle } from "@/composables/slideToggle";

const props = defineProps<{
  canRemove: boolean;
}>();

const emit = defineEmits(["remove", "reload"]);

const expandToggler = ref<HTMLElement>();
const reloadToggler = ref<HTMLElement>();
const collapseToggler = ref<HTMLElement>();
const removeToggler = ref<HTMLElement>();

onMounted(() => {
  if (expandToggler.value) {
    new Tooltip(expandToggler.value, {
      title: "Expand / Compress",
      placement: "bottom",
      trigger: "hover",
      container: "body",
    });

    expandToggler.value.onclick = (e) => {
      e.preventDefault();
      const panel = expandToggler.value!.closest(".panel") as HTMLElement;
      const className = "panel-expand";

      if (
        document.body.classList.contains(className) &&
        panel.classList.contains(className)
      ) {
        panel.removeAttribute("style");
        panel.classList.remove(className);
        document.body.classList.remove(className);
      } else {
        document.body.classList.add(className);
        panel.classList.add(className);
      }

      window.dispatchEvent(new Event("resize"));
    };
  }

  if (collapseToggler.value) {
    const tooltip = new Tooltip(collapseToggler.value, {
      title: "Collapse / Expand",
      placement: "bottom",
      trigger: "hover",
      container: "body",
    });

    collapseToggler.value.onclick = (e) => {
      e.preventDefault();
      tooltip.hide();
      const panel = collapseToggler.value!.closest(".panel") as HTMLElement;
      const body = panel?.querySelector(".panel-body") as HTMLElement | null;
      if (body) slideToggle(body);
    };
  }

  if (removeToggler.value) {
    new Tooltip(removeToggler.value, {
      title: "Remove",
      placement: "bottom",
      trigger: "hover",
      container: "body",
    });
  }

  if (reloadToggler.value) {
    const tooltip = new Tooltip(reloadToggler.value, {
      title: "Reload",
      placement: "bottom",
      trigger: "hover",
      container: "body",
    });

    reloadToggler.value.onclick = (e) => {
      e.preventDefault();
      tooltip.hide();
      const panel = reloadToggler.value!.closest(".panel") as HTMLElement;
      if (panel && !panel.classList.contains("panel-loading")) {
        const body = panel.querySelector(".panel-body");
        const loader = document.createElement("div");
        loader.className = "panel-loader";
        loader.innerHTML = '<span class="spinner spinner-sm"></span>';
        panel.classList.add("panel-loading");
        body?.appendChild(loader);

        setTimeout(() => {
          panel.classList.remove("panel-loading");
          loader.remove();

          // ⚡ Emitir reload al terminar la animación
          emit("reload");
        }, 2000);
      }
    };
  }
});
</script>
