import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map, take} from 'rxjs/operators';
import {Jugadores} from '../model/jugadores.model';


@Injectable({
    providedIn: 'root'
})
export class JugadoresService {
    private Jugadores: Observable<Jugadores[]>;
    private jugadoresCollection: AngularFirestoreCollection<Jugadores>;
    constructor(private angularFirestore: AngularFirestore) {
        this.jugadoresCollection = this.angularFirestore.collection<Jugadores>('Jugadores');
        this.Jugadores = this.jugadoresCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }
    getJugadoresOfEquipo(equipo: string): Observable<Jugadores[]>{
        this.jugadoresCollection = this.angularFirestore.collection<Jugadores>('Jugadores', ref => {
            return ref.where('Equipo', '==', equipo);
        });
        return this.getData();
    }

    getData(){
        return this.jugadoresCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }
    getJugadorId(id: string): Observable<Jugadores> {
        return this.jugadoresCollection.doc<Jugadores>(id).valueChanges().pipe(
            take(1),
            map(lugar => {
                lugar.id = id;
                return lugar;
            })
        );
    }

    getJugadores(){
        return this.Jugadores;
    }
}
