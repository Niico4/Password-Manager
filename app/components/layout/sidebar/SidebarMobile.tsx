'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import Image from 'next/image';
import {
  IconCategory,
  IconLogout,
  IconSettings,
  IconShieldLock,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import Logo from '@/public/Logo.svg';

import LinkItem from './components/LinkItem';
import { itemClasses } from './constants/itemClasses';
import { dataSidebarRoutes } from './Sidebar.routes';

const SidebarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex gap-4">
        <NavbarBrand>
          <Link href="/">
            <Image src={Logo} alt="Logo de la App" className="w-full h-auto" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarMenuToggle
          className="cursor-pointer"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarMenu className="mt-5 h-full w-full min-[700px]:w-1/3">
        <div className="flex flex-col justify-evenly h-4/5">
          <div>
            {dataSidebarRoutes.map(({ title, children, href, icon }, index) => {
              if (children) {
                return (
                  <Accordion
                    key={index}
                    isCompact
                    itemClasses={itemClasses}
                    className="p-0"
                  >
                    <AccordionItem
                      key={index}
                      title={title}
                      aria-label={title}
                      startContent={<IconCategory stroke={1} />}
                    >
                      {children.map(({ href, icon, title }, index) => {
                        return (
                          <LinkItem
                            key={index}
                            href={href}
                            icon={icon}
                            label={title}
                          />
                        );
                      })}
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
                variant="flat"
                color="primary"
                className="text-small font-light"
              >
                <IconSettings stroke={1} />
                Configuración
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="profile" color="primary">
                <Link
                  href="/profile"
                  className="flex gap-2 items-center text-small rounded-lg font-light"
                >
                  <IconUser stroke={1} /> Perfil
                </Link>
              </DropdownItem>
              <DropdownItem key="security" color="primary">
                <Link
                  href="/profile"
                  className="flex gap-2 items-center text-small rounded-lg font-light"
                >
                  <IconShieldLock stroke={1} /> Seguridad
                </Link>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                <div className="flex gap-2 items-center text-small rounded-lg font-light text-red-500 hover:text-white">
                  <IconLogout stroke={1} /> Cerrar Sesión
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default SidebarMobile;
