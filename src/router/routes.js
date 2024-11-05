const routes = [
  {
    path: "/",
    component: () => import('components/HomePage.vue'),
  },
  {
    path: "/LoginPage",
    component: () => import('components/LoginPage.vue'),
  },
  {
    path: "/ItemDetails",
    component: () => import('components/ItemDetails.vue'),
  },
  {
    path: "/FiltersPage",
    component: () => import('components/FiltersPage.vue'),
  },
  {
    path: "/PopularPeople",
    component: () => import('components/PopularPeople.vue'),
  },
  {
    path: "/PeopleDetails",
    component: () => import("components/PeopleDetails.vue"),
  },
  {
    path: "/SearchResults",
    component: () => import("src/components/SearchResults.vue"),
  },
  {
    path: "/KeywordDetails",
    component: () => import("src/components/KeywordDetails.vue"),
  },
  {
    path: "/CollectionDetails",
    component: () => import("src/components/CollectionDetails.vue"),
  },
  {
    path: "/UserPage",
    component: () => import("src/components/UserPage.vue"),
  },
  {
    path: "/ViewList",
    component: () => import("src/components/ViewList.vue"),
  },
  {
    path: "/CreateList",
    component: () => import("src/components/CreateList.vue"),
  },
  {
    path:"/EditList",
    component: () => import("src/components/EditList.vue"),
  },
]
export default routes
