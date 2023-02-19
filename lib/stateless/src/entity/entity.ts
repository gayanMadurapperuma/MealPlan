import { v4 } from 'uuid';
import moment from 'moment';

export abstract class Entity<TEntity> {
    private readonly _id: string;
    private readonly _mealDate: string;
    private readonly _mealTime: string;
    private readonly _createdAt: string;
    private readonly _updatedAt: string;
    protected props: TEntity;

    constructor(props: TEntity, id?: string, mealDate?: string, mealTime?: string, createdAt?: string, updatedAt?: string){
        this._id = id || v4();
        this._mealDate = mealDate || moment().format('YYYY-MM-DD');
        this._mealTime = mealTime || moment().format('HH:mm:SS');
        this._createdAt = createdAt || this.getISOString();
        this._updatedAt = updatedAt || this.getISOString();
        this.props = {
            ...props,
            id: this.id,
            mealDate: this.mealDate,
            mealTime: this.mealTime,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    public get id() {
        return this._id;
    }

    public get mealDate(){
        return this._mealDate;
    }

    public get mealTime() {
        return this._mealTime;
    }

    public get createdAt() {
        return this._createdAt;
    }

    public get updatedAt(){
        return this._updatedAt;
    }

    private getISOString() {
        return new Date().toISOString();
    }
}