
import { Module } from '@nestjs/common';
import { DripSchedulerService } from './drip.service';

@Module({
    providers: [DripSchedulerService],
})
export class SchedulerModule { }
