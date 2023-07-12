import { shallowMount } from "@vue/test-utils";
import { expect, test} from "vitest";
import MutateWindow from "../components/MutateWindow.vue";

const defaultData = {
    selectedAuthorId: 1,
    content: "",
    title: "",
    editMode: false,
    status: 200,
};

test("Mutate window (Edit Mode)", async () => {
    expect(MutateWindow).toBeTruthy(); // MutateWindow is defined
    const post = {
        "title": "abongus",
        "authorId": 2,
        "updated_at": "2023-7-10",
        "created_at": "2023-7-10",
        "body": "amongus sus sus amongus sus s dsd fs df sdf",
        "id": 1,
    };

    let editPostCalled = false;

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
        computed: {
            getShowMutateWindow: () => true,
            getShowDeleteWindow: () => false,
            getCurrentPost: () => (post),
            getEditMode: () => true,
        },
        methods: {
            toggleShowDeleteWindow: () => {},
            toggleShowMutateWindow: () => {},
            editPost: () => {editPostCalled = true;},
        },
    });

    expect(wrapper).toBeTruthy(); // MutateWindow is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Mutate");

    expect(wrapper.find("#AuthorId").element.className).toBe("disabled");
    expect(wrapper.find("#Title").element.value).toBe(post.title);
    expect(wrapper.find("#Content").element.value).toBe(post.body);

    // check if editPost is called
    await wrapper.find("button").trigger("click");
    expect(editPostCalled).toBe(true);
});

test("Mutate window (Create Mode)", async () => {
    expect(MutateWindow).toBeTruthy(); // MutateWindow is defined
    
    let createPostCalled = false;
    
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
        computed: {
            getShowMutateWindow: () => true,
            getShowDeleteWindow: () => false,
            getCurrentPost: () => (null),
            getEditMode: () => false,
        },
        methods: {
            toggleShowDeleteWindow: () => {},
            toggleShowMutateWindow: () => {},
            createPost: () => {createPostCalled = true;},
        },
    });

    expect(wrapper).toBeTruthy(); // MutateWindow is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Mutate");

    expect(wrapper.find("#AuthorId").element.className).toBe("");
    expect(wrapper.find("#Title").element.value).toBe("");
    expect(wrapper.find("#Content").element.value).toBe("");

    // check if editPost is called
    await wrapper.find("button").trigger("click");
    expect(createPostCalled).toBe(true);
});