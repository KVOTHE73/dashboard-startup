<template>
  <div class="card border-0 mb-3 bg-gray-800 text-white">
    <div class="card-body">
      <div class="mb-3 text-gray-500">
        <b>{{ t("dashboard.widgets.marketingCampaign.title") }}</b>
        <span class="ms-2">
          <i
            class="fa fa-info-circle"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            :data-bs-title="
              t('dashboard.widgets.marketingCampaign.tooltipTitle')
            "
            data-bs-placement="top"
            :data-bs-content="
              t('dashboard.widgets.marketingCampaign.tooltipContent')
            "
          >
          </i>
        </span>
      </div>
      <div
        v-for="campaign in campaigns"
        :key="campaign.name"
        class="row align-items-center pb-1px"
      >
        <div class="col-4">
          <div class="h-100px d-flex align-items-center justify-content-center">
            <img :src="campaign.img" class="mw-100 mh-100" />
          </div>
        </div>
        <div class="col-8">
          <div class="mb-2px text-truncate">{{ campaign.name }}</div>
          <div class="mb-2px text-gray-500 small">{{ campaign.date }}</div>
          <div class="d-flex align-items-center mb-2px">
            <div class="flex-grow-1">
              <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                <div
                  class="progress-bar progress-bar-striped"
                  :class="campaign.barClass"
                  data-animation="width"
                  :data-value="campaign.progress + '%'"
                  style="width: 0%"
                ></div>
              </div>
            </div>
            <div class="ms-2 small w-30px text-center">
              <span data-animation="number" :data-value="campaign.progress"
                >0</span
              >%
            </div>
          </div>
          <div class="text-gray-500 small mb-15px text-truncate">
            {{ campaign.desc }}
          </div>
          <a
            href="#"
            :class="`btn btn-xs ${campaign.btnClass} fs-10px ps-2 pe-2`"
            >{{ t("dashboard.widgets.marketingCampaign.view") }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

// 🌐 i18n
const { t } = useI18n();

const campaigns = [
  {
    name: "Email Marketing Campaign",
    date: "Mon 12/6 - Sun 18/6",
    progress: 80,
    desc: "57.5% people click the email",
    img: "/assets/img/svg/img-2.svg",
    barClass: "bg-indigo",
    btnClass: "btn-indigo",
  },
  {
    name: "Facebook Marketing Campaign",
    date: "Sat 10/6 - Sun 18/6",
    progress: 60,
    desc: "+124k visitors from facebook",
    img: "/assets/img/svg/img-3.svg",
    barClass: "bg-warning",
    btnClass: "btn-warning",
  },
];
</script>
