import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import Pagination from "../components/Pagination.vue";

test("Pagination functionality", async () => {
    expect(Pagination).toBeTruthy(); // Pagination is defined
    let nextCalled = false;
    let prevCalled = false;
    const wrapper = mount(Pagination, {
        computed: {
            currentPage: () => {return 2;},
            totalPosts: () => {return 18;},
            postsPerPage: () => {return 6;}
        },
        methods: {
            nextPage(){return nextCalled = true;},
            prevPage(){return prevCalled = true;}
        },
    });

    expect(wrapper).toBeTruthy(); // Pagination is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Pagination");

    // expect the pagination method to be called
    await wrapper.find("#PaginationButtonNext").trigger("click");
    await wrapper.find("#PaginationButtonPrev").trigger("click");
    expect(prevCalled).toBe(true);
    expect(nextCalled).toBe(true);
});