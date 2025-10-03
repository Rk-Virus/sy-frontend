import { fetchProfile, updateMyProfile } from "../service/api";
/* eslint-disable import/order */
import type { Ref } from "vue";
// import type { UserProfile } from "../models";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  // hydrate token/user from localStorage so reloads keep auth state
  const authToken = ref<string | null>(localStorage.getItem("authToken"));
  const isAuthenticated: Ref<boolean> = ref(!!authToken.value);
  const user: Ref<any | null> = ref(
    (() => {
      try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })()
  );
  const error: Ref<string | null> = ref(null);

  // methods
  const getProfile = async () => {
    try {
      const { data } = await fetchProfile();
      user.value = data ?? user.value;
      return data;
    } catch (err) {
      error.value = "Failed to fetch profile";
      throw err;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/login", {
        email: username,
        password: password,
      });
      const data = response.data;
      if (response.status === 200 && data) {
        isAuthenticated.value = true;
        authToken.value = data.token ?? null;
        user.value = data.user ?? { userId: data.userId ?? null };
        localStorage.setItem("authToken", authToken.value ?? "");
        localStorage.setItem("user", JSON.stringify(user.value));
        error.value = null;
        return true;
      } else {
        error.value = "Login failed. Please check your credentials.";
        return false;
      }
    } catch (err) {
      error.value = "Email or password wrong";
      return false;
    }
  };

  const updateProfile = async (data: any) => {
    const response = await updateMyProfile(data);
    // optionally refresh local user
    if (response?.data) {
      user.value = response.data;
      localStorage.setItem("user", JSON.stringify(user.value));
    }
    return response;
  };

  const logout = async () => {
    isAuthenticated.value = false;
    authToken.value = null;
    user.value = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // you may also want to clear selectedOrganization etc.
  };

  const selectedOrganization = ref<string | null>(localStorage.getItem("selectedOrganization"));

  watch(selectedOrganization, (orgId) => {
    if (orgId) {
      localStorage.setItem("selectedOrganization", orgId);
    } else {
      localStorage.removeItem("selectedOrganization");
    }
  });

  const localOrg = () => localStorage.getItem("selectedOrganization");

  return {
    isAuthenticated,
    user,
    getProfile,
    updateProfile,
    logout,
    selectedOrganization,
    localOrg,
    login,
    error,
    authToken,
  };
});
