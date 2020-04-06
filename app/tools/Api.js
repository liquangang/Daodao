import http from './Http';

// promise的封装操作
function to(promise){
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}

const httpApi={

    // 获取新闻分类列表
    async getNewsTypeList(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/post_cate_list';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取某个具体新闻分类下的新闻列表
    async getNewsList(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/post_list';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取个人信息页数据
    async getPersonalData(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/user_detail';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取消信息页数据
    async getMesData(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/notice_list';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取相册数据
    async getAlbumData(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/user_photo_list';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取帖子详情数据
    async getNewsData(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/post_detail';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

    // 获取帖子评论列表
    async getNewsCommentListData(params) {
        const url = 'http://dd.shenruxiang.com/api/v1/post_comment_list';
        const [err, res] = await to(http.post(url, params));
        if (err) {
            //请求失败
            return Object.assign(err, {
                status: "406",
                description: err.errMsg
            }, true);
        }
        //请求成功
        return res;
    },

}
export default httpApi;
