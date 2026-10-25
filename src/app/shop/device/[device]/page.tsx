import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { DEVICE_FAMILIES } from '@/data/products';

interface DevicePageProps {
  params: Promise<{
    device: string;
  }>;
}

export async function generateStaticParams() {
  return DEVICE_FAMILIES.map((family) => ({
    device: family.id,
  }));
}

export async function generateMetadata({ params }: DevicePageProps): Promise<Metadata> {
<<<<<<< HEAD
  const { device: deviceParam } = await params;
  const family = DEVICE_FAMILIES.find((f) => f.id === deviceParam);
=======
  const { device } = await params;
  const family = DEVICE_FAMILIES.find((f) => f.id === device);
>>>>>>> 64339cb54578808d83b3d24655974e0101314567
  if (!family) {
    return {
      title: 'Mobile Accessories — CellCentral Canada',
    };
  }
  return {
    title: `${family.name} & Protection — CellCentral Canada`,
    description: family.description,
  };
}

export default async function ShopDevicePage({ params }: DevicePageProps) {
<<<<<<< HEAD
  const { device: deviceParam } = await params;
  const family = DEVICE_FAMILIES.find((f) => f.id === deviceParam);
=======
  const { device } = await params;
  const family = DEVICE_FAMILIES.find((f) => f.id === device);
>>>>>>> 64339cb54578808d83b3d24655974e0101314567
  if (!family) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '64px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0B1E3D' }}>{family.name}</h1>
          <p style={{ color: '#64748B' }}>{family.description}</p>
        </div>
      }
    >
      <ShopCatalog
<<<<<<< HEAD
        initialDeviceFamily={deviceParam}
=======
        initialDeviceFamily={device}
>>>>>>> 64339cb54578808d83b3d24655974e0101314567
        categoryTitle={family.name}
        categoryDescription={family.description}
      />
    </Suspense>
  );
}
