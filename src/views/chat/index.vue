<template>
    <div>
        <h1>聊天室測試</h1>
        <div class="mb-1">
            <div v-for="(item,index) in messages" :key="index">
                <Message user-image="img/theme/team-2.jpg"
                         :user-name="item.user"
                         :message="item.message"
                         :like-count="10"
                         :share-count="3" />
                <hr>
            </div>
            <div class="media align-items-center">
                <div class="avatar avatar-lg rounded-circle mr-4">
                    <i class="fad fa-user-astronaut fa-2x"></i>
                </div>
                <div class="media-body">
                    <el-form :model="form"
                             :rules="rules"
                             ref="form"
                             class="demo-ruleForm">
                        <el-form-item label="訊息"
                                      prop="message">
                            <el-input @keyup.enter="sendMessage()"
                                      v-model="form.message"></el-input>
                            <el-button type="primary"
                                       @click="sendMessage()">確定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { SendMessageApi } from "../../api/chatApi";
import Message from "./Message.vue";
export default {
    components: {
        Message
    },
    computed: {
        ...mapState("userStore", ["user"])
    },
    data() {
        return {
            messages: [],
            message: null,
            form: {},
            rules: {
                message: [
                    {
                        required: true,
                        message: "請輸入訊息",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        async sendMessage() {
            let self = this;
            try {
                await self.$refs["form"].validate();
                try {
                    let { data } = await SendMessageApi({ message: self.form.message, account: self.user.account });
                    self.form.message = null;
                } catch (err) {
                    self.$message({
                        type: "error",
                        message: "發送訊息失敗"
                    });
                }
            } catch (err) {
                self.$message({
                    type: "error",
                    message: "請輸入訊息"
                });
            }
        }
    },
    mounted() {
        let self = this;
        window.Echo.channel("socket-connect").listen("Channel", (value) => {
            console.log(value);
            self.messages.push({
                user: value.user,
                message: value.message
            });
        });
    }
};
</script>
