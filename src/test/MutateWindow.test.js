import { shallowMount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test} from "vitest";
import MutateWindow from "../components/MutateWindow.vue";
import Vuex from "vuex";

import Store from "../store/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);


describe("Mutate window (Edit Mode)", async () => {
    expect(MutateWindow).toBeTruthy(); // MutateWindow is defined
    const post = {
        "title": "abongus",
        "authorId": 1,
        "updated_at": "2023-7-10",
        "created_at": "2023-7-10",
        "body": "amongus sus sus amongus sus s dsd fs df sdf",
        "id": 1,
    };

    const wrapper = shallowMount(MutateWindow, {        
        data() {return {
            selectedAuthorId: 1,
            content: post.body,
            title: post.title,
            editMode: true,
            status: 200,
        }},
        propsData: {
            authors: [
                {
                    "id": 1,
                    "name": "Oliver",
                    "created_at": "2023-05-31",
                    "updated_at": "2023-05-31",
                },
            ],
        },
        store: Store,
    });


    test("Is Everything Rendered right", () => {
        expect(wrapper).toBeTruthy(); // MutateWindow is mounted

        //check if the component is rendered
        expect(wrapper.html()).toContain("Mutate");
    });

    test('Is the data loaded into the form', () => {
        expect(wrapper.find("#Title").element.value).toBe(post.title);
        expect(wrapper.find("#Content").element.value).toBe(post.body);
    });

    test("Is the author select disabled", async () => {
        await wrapper.vm.$store.commit("mutateData/setEditMode", true);
        console.log(wrapper.vm.$store.state.mutateData.editMode)
        expect(wrapper.find("#AuthorId").element.className).toBe("disabled");
    });
});

describe("Mutate window (Create Mode)", async () => {
    expect(MutateWindow).toBeTruthy(); // MutateWindow is defined
    
    let store = Store;
    store.state.mutateData.editMode = false;
    
    const wrapper = shallowMount(MutateWindow, {
        data() {return {
            selectedAuthorId: 1,
            content: "",
            title: "",
            editMode: false,
            status: 200,
        }},
        propsData: {
            authors: [
                {
                    "id": 1,
                    "name": "Oliver",
                    "created_at": "2023-05-31",
                    "updated_at": "2023-05-31",
                },
            ],
        },
        store: Store,
    });

    test("Is Everything Rendered right", () => {
        expect(wrapper).toBeTruthy(); // MutateWindow is mounted

        //check if the component is rendered
        expect(wrapper.html()).toContain("Mutate");
    });

    test("Is the author select enabled", async () => {
        await wrapper.vm.$store.commit("mutateData/setEditMode", false);
        expect(wrapper.find("#AuthorId").element.className).toBe("");
    });

    test("Is there no data in the form", async () => {
        expect(wrapper.find("#Title").element.value).toBe("");
        expect(wrapper.find("#Content").element.value).toBe("");
    });

    test("Does closing the window work", async () => {
        const button = wrapper.find("#CloseMutate");
        await button.trigger("click");

        setTimeout(() => {
            // check if the store is updated
            expect(wrapper.vm.$store.state.mutateData.showMutateWindow).toBe(false);
            // check if it's hidden
            expect(wrapper.find("#MutateContainer").classes()).toContain("hidden");
        }, 200);
    });
});