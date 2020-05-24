import { EntityPartitionKey, EntityRowKey, EntityString } from '@nestjs/azure-database/dist';

const PARTITION_KEY = 'DrawID';
const ROW_KEY = 'DrawKey'

@EntityPartitionKey(PARTITION_KEY)
@EntityRowKey(ROW_KEY)
export class Draw {
  @EntityString() name: string;
}
