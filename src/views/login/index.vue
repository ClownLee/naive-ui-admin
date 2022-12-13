<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.loginImage" alt="" />
        </div>
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <div :class="{ 'view-account-qrcode': true, invalid: state.invalid }" :style="{ backgroundImage: `url(${state.qrUrl})` }"  @click="setQR"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import QRCode from 'qrcode';
  import moment from 'moment';
  import { reactive } from 'vue';
  import { websiteConfig } from '@/config/website.config';
  import Crypto from '@/utils/crypto';


  const crypto = new Crypto(
    '123dipaskfo%dfasda*4',
    'djfsajraert#423542352345'
  );

  const state = reactive({
    qrUrl: '',
    invalid: true
  });

  const generateQR = async text => {
    try {
      state.qrUrl = await QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
  }
  const setQR = () => {
    if(!state.invalid) return;

    state.invalid = false;
    const time = {
      type: 'login',
      refreshTime: moment().valueOf(),
      outTime: moment().add(120, 'seconds').valueOf()
    }

    generateQR(crypto.encrypt(time));
    
    let t = setInterval(() => {
      console.log(t);
      if(moment().valueOf() > time.outTime) {
        state.invalid = true;
        clearInterval(t);
      }
    }, 1000);
  }
  setQR();
</script>

<style lang="less" scoped>
  .invalid {
    position: relative;
    
  }
  .invalid::after {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    content: '[已失效]';
    cursor: pointer;
    text-align: center;
    line-height: 200px;
    font-size: 24px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.96);
  }
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    &-qrcode {
      margin: 0 auto;
      background-position: center;
      background-size: 100% 100%;
      width: 200px;
      height: 200px;
    }
    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
