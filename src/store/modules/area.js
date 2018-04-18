import Area from 'api/area';
import * as types from '../mutations-types';

const state = {
    areas: [],
    cacheRegion: {
        provinces: [],
        childrens: []
    },
    areaSate: {
        isNull: false,
        areaIds: []
    }
};

const getters = {
    areas: state => state.areas,
    areaSate: state => state.areaSate
};

const actions = {
    initArea({ commit, state }) {
        let provinces = state.cacheRegion.provinces;
        commit(types.AREAS_RESET);
        if (provinces.length) {
            commit(types.SET_AREAS, provinces);
        } else {
            Area.findRegion(null).then(data => {
                commit(types.SET_AREAS, data.areas);
                commit(types.AREAS_SET_ROOT_CACHE, data.areas);
            });
        }
    },
    findArea({ commit, state }, { id }) {
        let areasChildren = state.cacheRegion.childrens[id];
        if (areasChildren && areasChildren.length) {
            commit(types.SET_AREAS, areasChildren);
            commit(types.AREAS_CACHE_ID, { id });
        } else {
            Area.findRegion(id).then(data => {
                if (data.areas) {
                    commit(types.SET_AREAS, data.areas);
                    commit(types.AREAS_CACHE_ID, { id });
                    commit(types.AREAS_SET_CACHE, { id, data: data.areas });
                } else {
                    commit(types.AREAS_IS_NULL);
                }
            });
        }
    },
    findAreaByFullName({ commit, state }, { name }) {
        Area.findAreaByFullName(name).then(data => {
            console.log('findAreaByFullName', data);
            // commit(types.FIND_AREA, data.areas);
        }).catch(err => {

        })
    },
    resetCity({ commit, state }) {
        commit(types.AREAS_IS_SOLID);
    }
};

const mutations = {
    [types.SET_AREAS](state, data) {
        state.areas = data;
    },
    [types.AREAS_IS_NULL](state) {
        state.areaSate.isNull = true;
    },
    [types.AREAS_IS_SOLID](state) {
        state.areaSate.isNull = false;
    },
    [types.AREAS_CACHE_ID](state, { id }) {
        state.areaSate.areaIds.push(id);
    },
    [types.AREAS_SET_CACHE](state, { id, data }) {
        state.cacheRegion.childrens[id] = data;
    },
    [types.AREAS_SET_ROOT_CACHE](state, data) {
        state.cacheRegion.provinces = data;
    },
    [types.AREAS_RESET](state) {
        state.areas = [];
        state.areaSate.isNull = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}