<script>
import { mapGetters, mapMutations } from "vuex";

export function compareDates(d1, d2) {
            let date1 = new Date(d1).getTime();
            let date2 = new Date(d2).getTime();

            if (date1 > date2) {
                return true;
            } else if (date1 < date2) {
                return false;
            } return false;
        }

export function checkAllTrue(list){
    return Object.values(list).every((value) => value === true);
}

export function getCurrentDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${month}-${day}`;
}
</script>