import { tap } from 'rxjs/operators';
import { NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

export function handleNotFound(id: string | number) {
  return <T>(source: Observable<T>) => source.pipe(
    tap(entity => {
      if (!entity) {
        throw new NotFoundException(id);
      }
    }));
}
