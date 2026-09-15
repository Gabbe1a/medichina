import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDoctor } from "../actions";

export default async function AdminDoctorsPage() {
  const doctors = await prisma.doctor.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-navy">Врачи</h1>
        <Link href="/admin/doctors/new" className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">
          Добавить
        </Link>
      </div>
      <div className="mt-6 grid gap-3">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center gap-4 rounded-[24px] bg-white p-4">
            <img src={doctor.photoUrl} alt="" className="h-16 w-16 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="font-bold text-navy">{doctor.name}</p>
              <p className="text-sm text-muted">{doctor.role}</p>
            </div>
            <Link href={`/admin/doctors/${doctor.id}`} className="font-semibold text-accent">
              Изменить
            </Link>
            <form action={deleteDoctor}>
              <input type="hidden" name="id" value={doctor.id} />
              <button className="text-red-600">Удалить</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
