import { makeAutoObservable, runInAction} from "mobx"
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../models/Activity";
import agent from "../api/agent";

export default class ActivityStore {
  activityMap: Map<string, Activity> = new Map();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  submitting = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }


  loadActivities = async () => {
    try {
      const res = await agent.Activities.list();
      runInAction(() => {
        res.forEach((activity) => {
          activity.date = activity.date.split("T")[0]
          this.activityMap.set(activity.id, activity);
        });
        this.setLoadingInitial(false);
      })

    } catch(error) {
       this.setLoadingInitial(true);
    }
  }

  handleCreateOrEditActivity = async (activity: Activity) => {
    this.setSubmitting(true);
    try {
      if (activity?.id) {
        await agent.Activities.update(activity);
        runInAction(() => {
          this.activityMap.set(activity.id, activity);
        })
        
      } else {
        activity.id = uuidv4();
        await agent.Activities.create(activity);
        runInAction(() => {
          this.activityMap.set(activity.id, activity);
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setSelectedActivity(activity);
      this.setEditMode(false);
      this.setSubmitting(false); 
    }

  }

  get activitiesByDate() {
    return Array.from(this.activityMap.values()).sort((x, y) => Date.parse(x.date) - Date.parse(y.date));
  }

  handleDeleteActivity = async (id: string) => {
    this.setSubmitting(true);
    await agent.Activities.delete(id);
    this.activityMap.delete(id);
    this.setSubmitting(false);
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityMap.get(id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    if (id) {
      this.selectActivity(id);
    } else {
      this.cancelSelectedActivity();
    }
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  }

  setSelectedActivity = (activity: Activity) => {
    this.selectedActivity = activity;
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  setEditMode = (state: boolean) => {
    this.editMode = state;
  }
  

}