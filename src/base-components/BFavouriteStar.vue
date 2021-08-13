<template>
  <div class="b-favourite-star">
    <v-tooltip bottom v-if="value">
      <template v-slot:activator="{ on }">
        <v-icon class="fav-icon" :size="size" @click="unFavourite" v-on="on"
          >star</v-icon
        >
      </template>
      <span>{{ unFavouriteTooltip }}</span>
    </v-tooltip>
    <v-tooltip bottom v-else>
      <template v-slot:activator="{ on }">
        <v-icon :size="size" class="un-fav-icon" @click="favourite" v-on="on"
          >star_border</v-icon
        >
      </template>
      <span>{{ favouriteTooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "BFavouriteStar",
  props: {
    value: {
      type: Boolean
    },
    size: {
      type: [Number, String],
      default: 36
    },
    loading: {
      type: Boolean,
      default: false
    },
    favouriteTooltip: {
      type: String,
      default: "Click to favourite"
    },
    unFavouriteTooltip: {
      type: String,
      default: "Click to unfavourite"
    }
  },
  methods: {
    favourite() {
      this.$emit("favourite");
    },
    unFavourite() {
      this.$emit("un-favourite");
    }
  }
};
</script>

<style scoped lang="scss">
.b-favourite-star {
  line-height: 0;
  text-align: center;
  .fav-icon {
    color: var(--v-yellow-base);
    &:hover {
      color: var(--v-yellow-lighten1);
    }
  }
  .un-fav-icon {
    color: var(--v-grey-base);
    &:hover {
      color: var(--v-yellow-lighten1);
    }
  }
}
</style>
