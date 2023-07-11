import { mount } from "@vue/test-utils";
import { expect, test} from "vitest";
import Delete from "../components/Delete.vue";

test("Delete functionality", async () => {
    expect(Delete).toBeTruthy(); // Delete is defined
    let deletePostCalled = false;
    const wrapper = mount(Delete, {
        methods: {
          deletePost: () => {
            deletePostCalled = true;
          },
        },
        computed: {
            currentPostId: () => {return 1;},
            showDeleteWindow: () => {return true;}
        }

    });

    expect(wrapper).toBeTruthy(); // Delete is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("ConfirmContainer");

    // expect the deletePost method to be called
    await wrapper.find("button").trigger("click");
    expect(deletePostCalled).toBe(true);
});