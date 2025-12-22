import { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | 'actions';
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  isCalculated?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface StockTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function StockTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
}: StockTableProps<T>) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="stock-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {columns.map((col) => (
                    <td
                      key={`${row.id}-${String(col.key)}`}
                      className={`
                        ${col.isCalculated ? 'calculated-field' : ''}
                        ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}
                      `}
                    >
                      {col.render
                        ? col.render(col.key !== 'actions' ? row[col.key] : (undefined as T[keyof T]), row)
                        : col.key !== 'actions'
                        ? String(row[col.key] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
