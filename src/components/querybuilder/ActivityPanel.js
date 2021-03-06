/**
 * Copyright (c) IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import * as React from "react";
import withApp from "../../withApp";

let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

const ActivityPanel = ({formdata: { showPanel, actionHistory, nameHistory, timestampHistory }, onHidePanel}) =>{
    return (
      <React.Fragment>
        <Panel
          isOpen={showPanel}
          onDismiss={onHidePanel}
          type={PanelType.custom}
          customWidth="400px"
          headerText="Fifty (50) most recent activities"
        >
        <React.Fragment>
          { nameHistory && Array.isArray(nameHistory) &&
            nameHistory.map((name, index) => {
              return (
                <div key={index} className={"activity-entry"}>
                  <span key={1}><strong>{name}</strong></span>
                  <span key={2}> {actionHistory[index]}</span>
                  <span key={3}> on {new Date(timestampHistory[index]).toLocaleString(undefined, dateOptions)}</span>
                </div>
              )
            })
          }

          { nameHistory && !Array.isArray(nameHistory) &&
              <div key={0} className={"activity-entry"}>
                <span key={1}><strong>{nameHistory}</strong></span>
                <span key={2}> {actionHistory}</span>
                <span key={3}> on {new Date(timestampHistory).toLocaleString(undefined, dateOptions)}</span>
              </div>
          }

          { !nameHistory &&
            <div className={"activity-entry"}>
              <span>no activity history was recorded for this query</span>
            </div>
          }
        </React.Fragment>
        </Panel>
        
      </React.Fragment>
    );
  }

export default withApp(ActivityPanel)