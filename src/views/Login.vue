<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4">
        <div
            class="w-full max-w-3xl bg-white/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <!-- Left: Branding -->
            <div class="p-8 md:p-12 flex flex-col items-center justify-center bg-slate-50">
                <img src="/mainlogo.png" alt="SY logo" class="w-28 h-28 mb-4" />
                <h2 class="text-2xl font-semibold text-slate-800">SY Control Panel</h2>
                <p class="mt-2 text-sm text-slate-600 text-center max-w-xs">A single pane to manage robots, devices and
                    teams with ease.</p>
            </div>

            <!-- Right: Form -->
            <div class="p-8 md:p-12 flex flex-col justify-center">
                <div class="mb-6">
                    <h3 class="text-2xl font-bold text-slate-800">Sign in</h3>
                    <p class="text-sm text-slate-500 mt-1">Use your credentials to access the dashboard</p>
                </div>

                <form @submit.prevent="login" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input v-model="username" type="text" placeholder="name@company.com"
                            class="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input v-model="password" type="password" placeholder="••••••••"
                            class="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>

                    <div class="flex items-center justify-between text-sm text-slate-600">
                        <!-- <label class="flex items-center gap-2">
              <input type="checkbox" v-model="remember" class="w-4 h-4" />
              Remember me
            </label> -->
                        <RouterLink to="/" class="text-sky-600 hover:underline">Forgot?</RouterLink>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium">Sign
                            in</button>
                    </div>

                    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

                    <p class="text-center text-sm text-slate-500">Don't have an account? <RouterLink to="/"
                            class="text-sky-600">Contact admin</RouterLink>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const password = ref('');
const remember = ref(false);
const error = ref('');

const router = useRouter();

async function login() {
    error.value = '';
    if (!username.value || !password.value) {
        error.value = 'Please enter both username and password.';
        return;
    }
    const auth = useAuthStore();
    const ok = await auth.login(username.value, password.value)
    if(ok){
        //redirect
        // console.log(ok, auth.isAuthenticated)
        router.push('/');
    } else {
        error.value = auth.error ?? 'login failed';
    }
}
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 12px 40px rgba(2, 6, 23, 0.08);
}
</style>