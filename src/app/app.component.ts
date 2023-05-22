import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions, LogLevel } from '@microsoft/signalr';
import { interval, map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'SignalRClient';
  offers: any[] = [];
  private hubConnectionBuilder!: HubConnection;

  options: IHttpConnectionOptions = {
    accessTokenFactory: () => {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImI2NDEzMTE5LTRiNTUtZWQxMS05N2JjLTAwMTU1ZDcxNjQwMCIsIm5iZiI6MTY4NDMxNzM5OSwiZXhwIjoxNjg0OTIyMTk5LCJpYXQiOjE2ODQzMTczOTksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzMjQvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.ubJlQh0rsFXwoB1Kg4qcZ9zsV7KFEQw6W6mr9Ncvw3U";
    }
  };

  
  ngOnInit(): void {
    let endpoint = 'http://192.168.1.243:60767'
    //endpoint = 'http://localhost:60767'
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(endpoint+'/Hubs/Updates',this.options
      ).configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    this.hubConnectionBuilder.on('Updates', (result: any) => {
      console.log(result);
        this.offers.push(result);
    });
}

 sendMessage = ()=>{
  console.log('send');
  this.hubConnectionBuilder.send('SendUpdatesMessage','xd').then(res=> console.log(res))
}


}
