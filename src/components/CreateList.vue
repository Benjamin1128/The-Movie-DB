<template>
  <div class="row wrapperAll">
    <div class="col-3">
      <q-card class="my-card">
        <q-card-section class="sectionHeader">
          <div class="text-h6">Edit</div>
        </q-card-section>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section class="TargetSelecting"
              >Step 1: List Details</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="SideBarSection"
              >Step 2: Add Items</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="SideBarSection"
              >Step 3: Choose Image</q-item-section
            >
          </q-item>
        </q-list>
      </q-card>
    </div>
    <div class="col-9 formCreatelist">
      <h5>Create New List: Step 1</h5>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input filled v-model="listname" label="Name" />
        <q-input
          filled
          v-model="listdescription"
          type="textarea"
          label="Description"
        />
        <q-select
          filled
          v-model="publicList"
          :options="['Yes', 'No']"
          label="Public List?"
        />
        <q-select
          filled
          v-model="showComments"
          :options="['Yes', 'No']"
          label="Show Comments"
        />
        <q-select
          filled
          v-model="sortBy"
          :options="[
            { label: 'Original Ascending', value: 'original_order.asc' },
            { label: 'Original Descending', value: 'original_order.desc' },
            { label: 'Rating Ascending', value: 'vote_average.asc' },
            { label: 'Rating Descending', value: 'vote_average.desc' },
            { label: 'Release Date Ascending', value: 'release_date.asc' },
            { label: 'Release Date Descending', value: 'release_date.desc' },
            {
              label: 'Primary Release Date Ascending',
              value: 'primary_release_date.asc',
            },
            {
              label: 'Primary Release Date Descending',
              value: 'primary_release_date.desc',
            },
            { label: 'Title (A-Z)', value: 'title.asc' },
            { label: 'Title (Z-A)', value: 'title.desc' },
          ]"
          label="Sort By"
        />
        <q-btn no-caps label="Continue" type="submit" class="btnContinue" />
      </q-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  data() {
    return {
      listname: "",
      listdescription: "",
      publicList: "Yes",
      showComments: "Yes",
      sortBy: "Original Ascending",
    };
  },
  methods: {
    ...mapActions("CreateList", ["postCreateList"]),
    notifySuccess(message) {
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "positive",
        closeBtn: true,
      });
    },
    notifyError(message) {
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "negative",
        closeBtn: true,
      });
    },
    onSubmit() {
      if (this.listname) {
        this.postCreateList({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          listname: this.listname,
          listdescription: this.listdescription,
          listPublicstatus: this.publicList,
          sortBy: this.sortBy,
        })
          .then(() => {
            this.notifySuccess("Your changes have been successfully saved.");
          })
          .then(() => {
            const CurrentListId = this.getCreatedListID;
            if (CurrentListId) {
              this.$router.replace({
                path: `/EditList`,
                query: {
                  listId: CurrentListId,
                },
              });
            } else {
              this.notifyError("The name of the list is required.");
            }
          });
      } else {
        this.notifyError("The name of the list is required.");
      }
    },
  },
  computed: {
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccessToken",
    ]),
    ...mapGetters("CreateList", ["getCreatedListID"]),
  },
};
</script>

<style scoped>
.wrapperAll {
  margin: 3%;
}
.my-card {
  margin-top: 25%;
  width: 100%;
  max-width: 250px;
  border-radius: 10px;
}
.sectionHeader {
  color: white;
  background-color: #08b4e4;
}
.TargetSelecting {
  font-size: medium;
  color: aqua;
}
.SideBarSection {
  font-size: medium;
  color: black;
}
.SideBarSection:hover {
  color: aqua;
}

.formCreatelist {
  margin-top: 3%;
}

.formCreatelist h5 {
  font-weight: bold;
}

.btnContinue {
  color: white;
  background-color: #08b4e4;
  border-radius: 10px;
}
</style>
