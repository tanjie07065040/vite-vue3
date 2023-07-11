/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useAppStore } from "../../store/modules/app";
import bus from "vue3-eventbus";
export default defineComponent({
    name: "dashboard",
    components: {},
    props: ["data"],
    setup(props) {
        console.log(props.data);
        const frameSrc = ref('');
        const isFirst: any = ref(true);
        const appStore = useAppStore();

        /**
         * 初始化加载入口
         */
        onMounted(() => {
            if (isFirst) {
                const info: any = appStore.applink;
                frameSrc.value = info[0].url + "#token=Bearer " + appStore.getToken;
            }
            // 系统切换
            bus.on("SystemUrl", (ele: any) => {
                jumpSystem(ele);
                isFirst.value = false;
            });
        });

        // 系统URL变化后跳转
        function jumpSystem(url: string) {
            frameSrc.value = '';
            setTimeout(() => {
                frameSrc.value = url + "#token=Bearer " + appStore.getToken;
            }, 100)

        }

        function hideLoading() { }

        return { frameSrc, hideLoading };
    },
});