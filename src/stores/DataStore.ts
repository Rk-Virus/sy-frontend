import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user: Ref<any | null> = ref(null)
  const selectedOrganization: Ref<string> = ref('')
  const isAuthenticated: Ref<boolean> = ref(false)

  // Getters (computed)
  const userName = computed(() => user.value?.name || 'Guest')
  const userRole = computed(() => user.value?.role || 'user')

  // Actions (methods)
  function login(userData: any) {
    user.value = userData
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    selectedOrganization.value = ''
  }

  function setOrganization(orgId: string) {
    selectedOrganization.value = orgId
  }

  return {
    // State
    user,
    selectedOrganization,
    isAuthenticated,
    // Getters
    userName,
    userRole,
    // Actions
    login,
    logout,
    setOrganization
  }
})