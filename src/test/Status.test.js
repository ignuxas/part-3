import { mount, createLocalVue } from "@vue/test-utils";
import { beforeEach, describe, expect } from "vitest";
import Status from "../components/Status.vue";
import store from "../store/store";
import vuex from "vuex";

const localVue = createLocalVue();
localVue.use(vuex);

describe("Status rendered", async () => {
    let wrapper = mount(Status, {
        store: store,
    });
    expect(wrapper).toBeTruthy(); // Status is mounted

    wrapper.vm.$store.state.mutateData.showStatus = false;
    it("Is it hidden when showStatus: false", () => {
        expect(wrapper.find("#StatusContainer").classes()).toContain("hidden");
    });

    it("Is it shown when showStatus: true", () => {
        wrapper.vm.$store.state.mutateData.showStatus = true;
        expect(wrapper.find("#StatusContainer").classes()).toContain("success");
    });

    it("Is the text correct (200)", () => {
        expect(wrapper.find("h1").text()).toBe("Success");
        expect(wrapper.find("span").text()).toBe("The action was completed successfully");
    });

    it("Is the text correct (404)", async () => {
        // This is the only way I could get this to work 
        wrapper.vm.$store.state.mutateData.currentStatus = 404;
        await wrapper.vm.$store.dispatch("mutateData/toggleStatus", 404);

        expect(wrapper.find("h1").text()).toBe("Article not found");
        expect(wrapper.find("span").text()).toBe("The article you are looking for was not found");
    });

    it("Is the text correct (500)", async () => {
        wrapper.vm.$store.state.mutateData.currentStatus = 500;
        await wrapper.vm.$store.dispatch("mutateData/toggleStatus", 500);

        expect(wrapper.find("h1").text()).toBe("Server error");
        expect(wrapper.find("span").text()).toBe("There was an error on the server");
    });
});