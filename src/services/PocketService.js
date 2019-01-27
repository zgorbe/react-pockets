import { pockectsRef, db } from '../firebase';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class PocketService {
    addAction(pocketId, amount, direction, isMovement) {
        let pocketRef = db.ref('pockets/' + pocketId),
            actionsRef = db.ref('pockets/' + pocketId + '/actions');

        return pocketRef.once('value').then(snapshot => {
            let pocketData = snapshot.val(),
                newBalance = 0;

            if (direction === 'plus') {
                newBalance = pocketData.balance + amount;    
            } else {
                newBalance = pocketData.balance - amount;
            }

            if (newBalance >= 0) {
                let action = {
                    amount: amount,
                    direction: direction,
                    pocket: pocketId,
                    timestamp: new Date().getTime()
                };

                let pocketUpdate = pocketRef.update({
                    balance: newBalance,
                    timestamp: new Date().getTime()
                });

                if (isMovement) {
                    action.movement = true;
                }

                let actionUpdate = actionsRef.push(action);

                return Promise.all([pocketUpdate, actionUpdate]);
            } else {
                return Promise.reject('Invalid balance for pocket: "' + pocketData.name + '"');
            }
        });
    }

    updateAction(actionId, pocketId, newPocketName, newAmount) {
        let pocketRef = db.ref('pockets/' + pocketId),
            actionRef = db.ref('pockets/' + pocketId + '/actions/' + actionId);

        Promise.all([pocketRef.once('value'), actionRef.once('value')]).then(snapshots => {
            let [pocketData, actionData] = snapshots.map(snap => snap.val());

            console.log(pocketData, actionData);
        });
    }

    deleteAction(actionId, pocketId) {
        let actionsRef = db.ref('pockets/' + pocketId + '/actions');
        actionsRef.once('value').then(snapshot => {
            console.log(snapshot.val()); // remove child?
        });
    }
    addMovement(sourcePocketId, destinationPocketId, amount) {
        return this.addAction(sourcePocketId, amount, 'minus', true).then(() => {
            return this.addAction(destinationPocketId, amount, 'plus', true);
        });
    }

    getPockets() {
        return pockectsRef.once('value').then(snapshot => {
            let data = snapshot.val(),
                pockets = [];

            for (let id of Object.keys(data)) {
                data[id].id = id;
                pockets.push(data[id]);
            }
            return pockets;
        });
    }

    getAllActions(skipMovements) {
        return this.getPockets().then(pockets => {
            let actions = [];
            for (let pocket of pockets) {
                for (let key in pocket.actions) {
                    let action = pocket.actions[key];
                    
                    if (skipMovements && action.movement) {
                        continue;
                    }
                    action.key = key;
                    action.pocketName = pocket.name; 
                    actions.push(action);
                }
            }
            actions.sort(function(a, b) {
                return b.timestamp - a.timestamp;
            });

            return actions;
        });
    }
    
    getStatisticsData() {
        return this.getAllActions(true).then(actions => {
            let dataObj = {}
            for (let action of actions) {
                let date = new Date(action.timestamp),
                    year = date.getFullYear(),
                    month = months[date.getMonth()];

                dataObj[year] = dataObj[year] || {}; 
                dataObj[year][month] = dataObj[year][month] || [];
                dataObj[year][month].push(action);
            }

            return dataObj;
        });
    }

    filterIncomingOutgingData(dataObj, isIncoming) {
        let result = {};

        for (let year in dataObj) {
            for (let month in dataObj[year]) {
                result[year] = result[year] || {}; 
                result[year][month] = result[year][month] || [];

                result[year][month] = dataObj[year][month].filter(action => {
                    return (isIncoming && action.direction === 'plus') || 
                            (!isIncoming && action.direction === 'minus');
                });

                if (!isIncoming) {
                    for (let action of result[year][month]) {
                        action.direction = 'plus';
                    }
                }
            }
        }

        return result;
    }
}

const pocketService = new PocketService();
export default pocketService;