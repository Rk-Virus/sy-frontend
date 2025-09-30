<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// import { fetchProfile } from '~/service/api';

const profile = ref({
    access_level: 1
});
// const authStore = useAuthStore();

const router = useRouter();

const count = ref("open");

const logOut = () => {
//   authStore.logout();
  router.push({ name: "login" });
};
</script>

<script lang="ts">
export default {
  name: "SideBar",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
<aside id="hs-offcanvas-example" class="border-r-black z-[30] lg:w-64 xl:w-64 md:w-64 w-16 bg-white border-2 pt-3 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabindex="-1" aria-label="Sidebar">
    <div class="lg:px-6 md:px-6 xl:px-6 lg:mb-0 md:mb-0mxl:mb-0 mb-6">
      <a class="flex justify-centre items-center font-semibold text-xl text-black gap-2 focus:outline-none focus:opacity-80 sm:w-full dark:text-white" href="#" aria-label="Brand"><img src="/mainlogo.png" class="w-10 ml-1"/><p class="md:block lg:block xl:block hidden">SudoYantra</p></a>
    </div>
    <nav class="hs-accordion-group lg:p-6 md:p-6 xl:p-6 p-0 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul class="space-y-1.5">
        <li>
          <router-link to="/dashboard" :class="{'bg-gray-100' : $route.path === '/dashboard' || false}" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 lg:rounded-lg md:rounded-lg xl:rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white">
            <svg class="w-6 h-6" :class="{'hidden' : $route.path === '/dashboard', 'block' : $route.path !== '/dashboard'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z"></path></svg>
            <img class="w-6 h-6" :class="{'block' : $route.path === '/dashboard', 'hidden' : $route.path !== '/dashboard'}" src="/dashboardIcon.svg" />
            <!-- <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> -->
            <p class="md:block lg:block xl:block hidden">Dashboard</p>
          </router-link>
        </li>
        <li class="hs-accordion" id="users-accordion">
            <router-link to="/robots" :class="{'bg-gray-100' : $route.path === '/robots' || false}" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 lg:rounded-lg md:rounded-lg xl:rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white">
              <svg class="w-6 h-6" :class="{'hidden' : $route.path === '/robots', 'block' : $route.path !== '/robots'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m20.772 10.156-1.368-4.105A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.105A2.003 2.003 0 0 0 2 12v5c0 .753.423 1.402 1.039 1.743-.013.066-.039.126-.039.195V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.062c0-.069-.026-.13-.039-.195A1.993 1.993 0 0 0 22 17v-5c0-.829-.508-1.541-1.228-1.844zM4 17v-5h16l.002 5H4zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6z"></path><circle cx="6.5" cy="14.5" r="1.5"></circle><circle cx="17.5" cy="14.5" r="1.5"></circle></svg>
              <svg class="w-6 h-6" :class="{'block' : $route.path === '/robots', 'hidden' : $route.path !== '/robots'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path></svg>
              <p class="md:block lg:block xl:block hidden">Robots</p>
          </router-link>
        </li>
        <li class="hs-accordion" id="account-accordion">
            <router-link to="/block" :class="{'bg-gray-100' : $route.path === '/block' || false}" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 lg:rounded-lg md:rounded-lg xl:rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
              <svg class="w-6 h-6" :class="{'hidden' : $route.path === '/block', 'block' : $route.path !== '/block'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2zm16.002 14H5V5h14l.002 14z"></path><path d="M15 12h2V7h-5v2h3zm-3 3H9v-3H7v5h5z"></path></svg>
              <svg class="w-6 h-6" :class="{'block' : $route.path === '/block', 'hidden' : $route.path !== '/block'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14zm9-13h6v6h-2V8h-4V6zm-6 6h2v4h4v2H6v-6z"></path></svg>
              <p class="md:block lg:block xl:block hidden">Block</p>
          </router-link>
        </li>
        <li class="hs-accordion" 
        v-if="profile?.access_level === 1" 
        id="account-accordion">
            <router-link to="/organization" :class="{'bg-gray-100' : $route.path === '/organization' || false}" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 lg:rounded-lg md:rounded-lg xl:rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
              <svg class="w-6 h-6" :class="{'hidden' : $route.path === '/organization', 'block' : $route.path !== '/organization'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"></path><path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"></path></svg>
              <svg class="w-6 h-6" :class="{'block' : $route.path === '/organization', 'hidden' : $route.path !== '/organization'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M7 14.001h2v2H7z"></path><path d="M19 2h-8a2 2 0 0 0-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zM5 20v-8h6v8H5zm9-12h-2V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2z"></path></svg>
              <p class="md:block lg:block xl:block hidden">Organization</p>
          </router-link>
        </li>
        <li class="hs-accordion" 
        v-if="profile?.access_level < 3" 
        id="account-accordion">
            <router-link to="/team" :class="{'bg-gray-100' : $route.path === '/team' || false}" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 lg:rounded-lg md:rounded-lg xl:rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
              <svg class="w-6 h-6" :class="{'hidden' : $route.path === '/team', 'block' : $route.path !== '/team'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z"></path></svg>
              <svg class="w-6 h-6" :class="{'block' : $route.path === '/team', 'hidden' : $route.path !== '/team'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path></svg>
              <p class="md:block lg:block xl:block hidden">Team</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
  <div class="absolute lg:left-6 md:left-6 xl:left-6 left-2 bottom-10 z-100">
      </div>
</template>