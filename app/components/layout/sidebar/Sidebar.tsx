'use client';

import React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import {
  IconCategory,
  IconSettings,
  IconUser,
  // IconShieldLock,
  IconLogout,
} from '@tabler/icons-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import Logo from '@/public/Logo.svg';

import LinkItem from './components/LinkItem';
import { dataSidebarRoutes } from './Sidebar.routes';
import { itemClasses } from './constants/itemClasses';

const Sidebar = () => {
  return (
    <aside className="w-full flex flex-col items-center my-10">
      <div className="flex flex-col justify-between h-full">
        <Link href="/">
          <Image src={Logo} alt="Logo de la App" className="w-full h-auto" />
        </Link>
        <div className="flex flex-col gap-2">
          {dataSidebarRoutes.map(({ href, icon, title, children }, index) => {
            if (children) {
              return (
                <Accordion
                  key={index}
                  isCompact
                  itemClasses={itemClasses}
                  className="p-0"
                >
                  <AccordionItem
                    key={href}
                    title={title}
                    aria-label={title}
                    startContent={<IconCategory stroke={1} />}
                  >
                    {children.map(({ href, icon, title }, index) => (
                      <LinkItem
                        key={index}
                        href={href}
                        icon={icon}
                        label={title}
                      />
                    ))}
                  </AccordionItem>
                </Accordion>
              );
            }

            return (
              <LinkItem key={index} href={href} icon={icon} label={title} />
            );
          })}
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              color="primary"
              className="text-small font-light text-black hover:text-blue-500"
            >
              <IconSettings stroke={1} />
              Configuración
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="profile" color="primary" textValue="Perfil">
              <Link
                href="/profile"
                className="flex gap-2 items-center text-small rounded-lg font-light"
              >
                <IconUser stroke={1} /> Perfil
              </Link>
            </DropdownItem>
            {/* <DropdownItem key="security" color="primary" textValue="Seguridad">
              <Link
                href="/profile"
                className="flex gap-2 items-center text-small rounded-lg font-light"
              >
                <IconShieldLock stroke={1} /> Seguridad
              </Link>
            </DropdownItem> */}
            <DropdownItem
              key="logout"
              variant="flat"
              color="danger"
              textValue="Cerrar sesión"
              onClick={() => signOut()}
            >
              <div className="flex gap-2 items-center text-small rounded-lg font-light">
                <IconLogout stroke={1} /> Cerrar Sesión
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </aside>
  );
};

export default Sidebar;
