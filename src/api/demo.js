import Vue from 'Vue';
import axios from 'axios';

import { HOST } from 'config/index';

export const getDemo = () => {
    axios.get(HOST.enquire + '/');
};