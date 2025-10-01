import { fetchProfile, updateMyProfile } from "../service/api";
/* eslint-disable import/order */
import type { Ref } from "vue";
// import type { UserProfile } from "../models";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated: Ref<Boolean> = ref(false);
  const user: Ref<any | void> = ref();
  // const profile: Ref<UserProfile | null> = ref(null);

  // getters

  const getProfile = computed(async () => {
    const { data } = await fetchProfile();
    // profile.value = data;
    return data;
  });

  let key: string | undefined;

  const updateProfile = async (data: any) => {
    const response = await updateMyProfile(data);
    return response;
  };

  const logout = async () => {
    console.log("Logging out");
  };

  const selectedOrganization = ref<string | null>(null);

  watch(selectedOrganization, (orgId) => {
    if (orgId) {
      localStorage.setItem("selectedOrganization", orgId);
    }
  });

  const localOrg = () => localStorage.getItem("selectedOrganization");
  return {
    isAuthenticated,
    // profile,
    user,
    getProfile,
    updateProfile,
    logout,
    key,
    selectedOrganization,
    localOrg,
  };
});
