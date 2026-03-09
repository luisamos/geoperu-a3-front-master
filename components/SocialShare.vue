<template>
  <div v-show="visible" class="social-share no-print">
    <a :href="emailUrl" target="_blank" class="share-btn share-email" title="Email">
      <i class="fas fa-at"></i>
    </a>
    <a :href="twitterUrl" target="_blank" class="share-btn share-twitter" title="Twitter">
      <i class="fab fa-twitter"></i>
    </a>
    <a :href="facebookUrl" target="_blank" class="share-btn share-facebook" title="Facebook">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a :href="whatsappUrl" target="_blank" class="share-btn share-whatsapp" title="WhatsApp">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a :href="linkedinUrl" target="_blank" class="share-btn share-linkedin" title="LinkedIn">
      <i class="fab fa-linkedin"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String, default: '' },
    description: { type: String, default: '' },
    visible: { type: Boolean, default: false }
  },
  computed: {
    encodedUrl() {
      return encodeURIComponent(this.url)
    },
    encodedText() {
      return encodeURIComponent(this.description)
    },
    emailUrl() {
      return `mailto:?subject=${this.encodedText}&body=${this.encodedUrl}`
    },
    twitterUrl() {
      return `https://twitter.com/intent/tweet?url=${this.encodedUrl}&text=${this.encodedText}`
    },
    facebookUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.encodedUrl}`
    },
    whatsappUrl() {
      if (typeof navigator !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
        return `whatsapp://send?text=${this.encodedUrl} ${this.encodedText}`
      }
      return `https://web.whatsapp.com/send?text=${this.encodedUrl} ${this.encodedText}`
    },
    linkedinUrl() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.encodedUrl}&title=${this.encodedText}`
    }
  }
}
</script>

<style scoped>
.social-share {
  display: flex;
  gap: 6px;
}
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: white !important;
  font-size: 15px;
  text-decoration: none;
}
.share-email { background-color: #3490dc; }
.share-twitter { background-color: #1da1f2; }
.share-facebook { background-color: #3b5998; }
.share-whatsapp { background-color: #25d366; }
.share-linkedin { background-color: #0077b5; }
</style>
