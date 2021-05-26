<template>
    <div class="media media-comment">
        <div class="avatar avatar-lg rounded-circle mr-4">
            <i class="fad fa-user-astronaut fa-2x"></i>
        </div>
        <div class="media-body">
            <div class="media-comment-text" :class="userName === user.userable.name ? 'float-right' : 'float-left'">
                <h6 class="h5 mt-0">{{userName}}</h6>
                <p class="text-sm lh-160">{{message}}</p>
                <div class="icon-actions">
                    <a href="#"
                       class="like active">
                        <i class="ni ni-like-2"></i>
                        <span class="text-muted">{{likeCount}} likes</span>
                    </a>
                    <a href="#">
                        <i class="ni ni-curved-next"></i>
                        <span class="text-muted">{{shareCount}} shares</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    // name: "Message",
    props: {
        userImage: {
            type: String,
            default: "img/theme/team-4.jpg"
        },
        userName: {
            type: String,
            default: "Michael Lewis"
        },
        message: {
            type: String,
            default: null
        },
        likeCount: {
            type: Number,
            default: 0
        },
        shareCount: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapState("userStore", ["user"])
    }
};
</script>
<style>
</style>
