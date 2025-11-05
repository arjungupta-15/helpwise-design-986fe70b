import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const statusColors = {
  online: "bg-green-600",
  offline: "bg-red-600",
  degraded: "bg-yellow-500",
};

function ConnectorCard({ name, status, lastSync, successes, failures }) {
  const color = statusColors[status] || "bg-gray-500";
  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{name}</h3>
        <Badge className={`${color} text-white`}>{status}</Badge>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted-foreground">Last sync</div>
          <div className="font-medium">{lastSync}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Successes</div>
          <div className="font-medium">{successes}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Failures</div>
          <div className="font-medium">{failures}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Re-sync</Button>
          <Button size="sm" variant="secondary">View logs</Button>
        </div>
      </div>
    </Card>
  );
}

function SourceSummary({ items }) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Source Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((src) => (
          <Card key={src.name} className="p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{src.name}</div>
              <Badge variant="outline">{src.queue} in queue</Badge>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground">New</div>
                <div className="font-semibold">{src.new}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Open</div>
                <div className="font-semibold">{src.open}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Resolved</div>
                <div className="font-semibold">{src.resolved}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

function SyncHistoryTable({ rows }) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Recent Sync Activity</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date/Time</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.time}</TableCell>
              <TableCell>{r.source}</TableCell>
              <TableCell>{r.items}</TableCell>
              <TableCell>
                <Badge className={`${statusColors[r.status] || "bg-gray-500"} text-white`}>{r.status}</Badge>
              </TableCell>
              <TableCell>{r.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function IngestionAlerts({ alerts }) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Connector Alerts</h3>
      <ul className="space-y-2 text-sm">
        {alerts.length === 0 ? (
          <li className="text-muted-foreground">No active alerts</li>
        ) : (
          alerts.map((a, i) => (
            <li key={i} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{a.source}:</span> {a.message}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{a.level}</Badge>
                <Button size="sm" variant="secondary">Retry</Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}

export default function IngestionDashboard() {
  const connectors = [
    { name: "GLPI", status: "online", lastSync: "Today 10:12", successes: 154, failures: 2 },
    { name: "SAP Solman", status: "degraded", lastSync: "Today 09:55", successes: 89, failures: 7 },
    { name: "Email (IMAP)", status: "online", lastSync: "Today 10:20", successes: 231, failures: 1 },
  ];

  const sourceSummary = [
    { name: "GLPI", new: 18, open: 120, resolved: 45, queue: 7 },
    { name: "Solman", new: 11, open: 86, resolved: 34, queue: 12 },
    { name: "Email", new: 27, open: 73, resolved: 29, queue: 5 },
  ];

  const syncRows = [
    { time: "10:20", source: "Email", items: 32, status: "online", duration: "3.4s" },
    { time: "10:12", source: "GLPI", items: 21, status: "online", duration: "2.1s" },
    { time: "09:55", source: "Solman", items: 17, status: "degraded", duration: "7.8s" },
    { time: "09:35", source: "Email", items: 28, status: "online", duration: "3.2s" },
  ];

  const alerts = [
    { source: "Solman", level: "warning", message: "API rate limited – retries scheduled" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Ingestion Dashboard</h2>
        <p className="text-sm text-muted-foreground">GLPI, Solman, aur Email connectors ki health, queues aur sync activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {connectors.map((c) => (
          <ConnectorCard key={c.name} {...c} />
        ))}
      </div>

      <SourceSummary items={sourceSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SyncHistoryTable rows={syncRows} />
        </div>
        <div className="lg:col-span-1">
          <IngestionAlerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
}