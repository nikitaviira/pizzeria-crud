import { Component, Vue } from "vue-property-decorator";

@Component
export default class ScreenBreakPointsControl extends Vue {

    private screenWidth: number = document.getElementById('app')!.offsetWidth;
    private documentHeight: number = document.body.clientHeight;
    private screenHeight: number = window.screen.height;

    get screewWidth(): number {
        return this.screenWidth;
    }

    get navbarBreakPoint(): boolean {
        return this.screenWidth < 765;
    }

    get langChangeBreakPoint(): boolean {
        return this.screenWidth < 420;
    }

    private mounted(): void {
        window.addEventListener('resize', () => {
            this.screenWidth = document.getElementById('app')!.offsetWidth;
            this.documentHeight = document.body.clientHeight;
            this.screenHeight = window.screen.height;
        });
    }

    private beforeDestroy(): void {
        window.removeEventListener('resize', () => {
            this.screenWidth = document.getElementById('app')!.offsetWidth;
            this.documentHeight = document.body.clientHeight;
            this.screenHeight = window.screen.height;
        });
    }

}
