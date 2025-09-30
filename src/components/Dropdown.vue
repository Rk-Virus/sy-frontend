<script setup lang="ts">
const emits = defineEmits(["onClick"]);
const handleClick = (e: any) => {
    emits("onClick", e);
};
defineProps({
    title: String,
    list: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="m-1 hs-dropdown [--placement:bottom-right] relative inline-flex" data-hs-dropdown-auto-close="inside">
        <button id="hs-dropdown-item-checkbox" type="button"
            class="hs-dropdown-toggle py-2 px-1.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-transparent outline-none border-0 text-grey-700 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 ">
            <slot name="icon" />
            {{ (`${title}`) }}
            <!-- {{ $t(`${title}`) }} -->
            <svg class="lg-ui-caret-0000 leafygreen-ui-1ebs75t" height="16" width="16" role="img"
                aria-label="Caret Down Icon" viewBox="0 0 16 16">
                <path
                    d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z"
                    fill="currentColor"></path>
            </svg>
        </button>

        <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-lg rounded-lg p-2 mt-2 border border-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700 z-[1000]"
            aria-labelledby="hs-dropdown-item-checkbox">
            <div v-for="item in list">
                <input :id="(item as any).id" :value="(item as any).id" @click="handleClick" class="hidden" />
                <label :for="(item as any).id">
                    <span
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 cursor-pointer"
                        :class="{
                            'bg-primary !text-white hover:bg-primary hover:!text-gray-600': (item as any).name?.toLocaleLowerCase() === title?.toLocaleLowerCase(),
                        }">
                        {{ ((item as any).name) }}
                        <!-- {{ $t((item as any).name) }} -->
                        </span>
                </label>
            </div>
        </div>
    </div>
</template>