<template lang="html">
  <div class="mail-subscription">
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
    <div class="show-control">
      <button
        type="button"
        name="button"
        :class="{ 'shown': showable }"
        @click="toggleShowable">
        {{ showableText }}
      </button>
    </div>
    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup" v-show="showable">
      <form action="https://vanorama.us20.list-manage.com/subscribe/post?u=b181882b56b165cd3f4032777&amp;id=befa5b7ac0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
          <div class="indicates-required"><span class="asterisk">*</span> requis</div>
          <div class="mc-field-group">
            <label for="mce-EMAIL">Adresse courriel <span class="asterisk">*</span>
            </label>
            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_b181882b56b165cd3f4032777_befa5b7ac0" tabindex="-1" value=""></div>
          <div class="clear"><input type="submit" value="Valider" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
      </form>
    </div>
    <!--End mc_embed_signup-->
  </div>
</template>

<script>
export default {
  name: 'MailSubscription',

  data () {
    return {
      loaded: false,
      showable: false
    }
  },

  computed: {
    showableText () {
      return this.showable ? 'En fait non.' : 'Prévenez-moi quand il y a du nouveau !'
    }
  },

  methods: {
    async toggleShowable () {
      const loaded = await this.loadMailchimpStuff()
      this.loaded = loaded
      this.showable = !this.showable
    },

    loadMailchimpStuff () {
      if (this.loaded === false) {
        return new Promise((resolve, reject) => {
          let mailchimpScript = document.createElement('script')
          mailchimpScript.onload = () => {
            (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);
            resolve(true)
          }
          mailchimpScript.setAttribute('async', true)
          mailchimpScript.setAttribute('src', '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js')
          document.head.appendChild(mailchimpScript)
        })
      } else {
        return Promise.resolve(true)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.mail-subscription{
  margin-bottom: 36px;
  .show-control{
    padding: 0 $main_photo_gap;
    button{
      position: relative;
      display: block;
      margin: auto;
      background: #fff;
      border: 1px solid $color_text_date;
      color: $color_text_main;
      padding: 10px 40px 10px 20px;
      font-size: 1em;
      border-radius: 3px;
      cursor: pointer;
      outline: none;

      &::after{
        content: '';
        display: block;
        position: absolute;
        top: 50%; right: calc((40px - 20px) / 2);
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid $color_text_main;
        transform: translate(0, -50%) rotate(0);
        pointer-events: none;
        transition: all 350ms;
      }

      &.shown{
        &::after{
          transform: translate(0, -50%) rotate(180deg);
        }
      }
    }
  }
  #mc_embed_signup .button{
    background: $color_text_date;
    // border: 1px solid $color_text_date;
    border: none;
  }
}
</style>
