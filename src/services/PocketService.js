import { pockectsRef, db } from '../firebase';

class PocketService {
    addAction(pocketId, amount, direction, isMovement) {
        var pocketRef = db.ref('pockets/' + pocketId),
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

                return Promise.all(pocketUpdate, actionUpdate);
            } else {
                return Promise.reject('Invalid balance for pocket: "' + pocketData.name + '"');
            }
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
}

const pocketService = new PocketService();
export default pocketService;