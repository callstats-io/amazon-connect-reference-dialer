import React, {Component} from "react";

import * as connectRTC from './../api/thirdparty/connect-rtc';
import * as amazonConnect from './../api/thirdparty/amazon-connect';
import csioHandler from "../api/csioHandler";

const ccpUrl = `https://${__connect_url__}/connect/ccp#/`;

class BasicDemoHome extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#basic-dialer").css('display', 'block');
        $("#basic-dialer").removeClass('col-md-6');
        $("#basic-dialer").addClass('col-md-12');

        const containerDiv = document.getElementById('containerDiv');
        connect.core.initCCP(containerDiv, {
            ccpUrl: ccpUrl,
            loginPopup: true,
            softphone: {
                allowFramedSoftphone: false,
            }
        });
        connect.core.initSoftphoneManager({allowFramedSoftphone: true});
        connect.agent((agent) => {
            csioHandler.register(this.dispatch, agent);
        });
    }

    render() {
        return (
            <div style={{display: 'none'}}/>
        );
    }
}

export default BasicDemoHome;
