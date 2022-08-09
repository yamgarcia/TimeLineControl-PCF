import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

const vis = require("vis-timeline");

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class timelinecontrol
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _timelineElm: HTMLDivElement;
  private _timelineVis: any;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code

    this._timelineElm = document.createElement("div");
    container.appendChild(this._timelineElm);
  }

  /**
   ** Function for the timeline creation
   */
  private renderTimeline(): void {
    // Create a DataSet (allows two way data-binding)
    var items = [
      { id: 1, content: "item 1", start: "2020-08-20" },
      { id: 2, content: "item 2", start: "2020-08-14" },
      { id: 3, content: "item 3", start: "2020-08-18" },
      { id: 4, content: "item 4", start: "2020-08-16", end: "2020-08-19" },
      { id: 5, content: "item 5", start: "2020-08-25" },
      { id: 6, content: "item 6", start: "2020-08-27", type: "point" },
    ];
    // Configuration for the Timeline
    var options = {};
    // Create a Timeline
    var timeline = new vis.Timeline(this._timelineElm, items, options);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    this.renderTimeline();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
